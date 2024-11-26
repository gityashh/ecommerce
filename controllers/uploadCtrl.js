const asyncHandler = require("express-async-handler");
const { cloudinaryUploadImage, cloudinaryDeleteImage } = require("../config/cloudinaryConfig");
const fs = require("fs");

// upload product images
const uploadProductImage = asyncHandler(async (req, res) => {
    try {
      // Assuming `uploader` is a utility function for uploading images
      const uploader = (path) => cloudinaryUploadImage(path, "images");
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path); // Upload file and get the URL
        urls.push(newpath); // Push uploaded file URL to the array
        fs.unlinkSync(path);
      }
  
      const images = urls.map((file) => {
        return file;
      });
      res.json(images);
    } catch (error) {
      throw new Error(error.message || "Failed to upload image");
    }
  });
  
  // delete product images
  const deleteProductImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await cloudinaryDeleteImage(id, "images");
      res.json({ message: "Image deleted successfully", deleted });
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = { uploadProductImage, deleteProductImage };
  