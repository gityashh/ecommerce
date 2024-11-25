const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");
const fs = require("fs");
const { validateMongodbId } = require("../utils/validateMongodbId");
const Product = require("../models/productModel");
const { deleteImage } = require("../middlewares/uploadImage");

// upload product images
const uploadImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    console.log(req.files);
    try {
      // Assuming `uploader` is a utility function for uploading images
      const uploader = async (path) => {
        // Replace this with the actual implementation for your uploader
        return await cloudinary.uploader.upload(path, { folder: "images" });
      };
  
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path); // Upload file and get the URL
        urls.push(newpath); // Push uploaded file URL to the array
        fs.unlinkSync(path);
      }
  
      const product = await Product.findByIdAndUpdate(
        id,
        {
          images: urls.map((file) => file), // Map and save the URLs to the product
        },
        { new: true } // Return the updated document
      );
      res.json(product);
    } catch (error) {
      throw new Error(error.message || "Failed to upload image");
    }
});

const deleteUploaded = asyncHandler(async (req, res) => {
  const { id } = req.params;
    validateMongodbId(id);
  try {
    const deleted = await deleteImage(id, "images");
    res.json(deleted);
  } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
  uploadImage,
  deleteUploaded,
};
