const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User = require("../models/userModel");
const validateMongodbId = require("../utils/validateMongodb");
const { uploader, cloudinary } = require("../config/cloudinaryConfig");
// create product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

// get all products
const getallProducts = asyncHandler(async (req, res) => {
  try {
    // filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((field) => delete queryObj[field]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);

    // sorting
    let sort = "-createdAt";
    if (req.query.sort) {
      sort = req.query.sort.split(",").join(" ");
    } else {
      sort = "-createdAt";
    }

    // limiting the fields
    let fields = "-__v";
    if (req.query.fields) {
      fields = req.query.fields.split(",").join(" ");
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const productCount = await Product.countDocuments(query);
      if (skip >= productCount) throw new Error("This page does not exist");
    }

    // execute query
    const products = await Product.find(query)
      .sort(sort)
      .select(fields)
      .skip(skip)
      .limit(limit);
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

// get a product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

// add to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const { _id } = req.user;
  validateMongodbId(productId);
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === productId
    );
    if (alreadyAdded) {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $pull: { wishlist: productId } },
        { new: true }
      );
      res.json({ message: "Product removed from wishlist", updatedUser });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $push: { wishlist: productId } },
        { new: true }
      );
      res.json({ message: "Product added to wishlist", updatedUser });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// rating

const rating = asyncHandler(async (req, res) => {
  const { star, comment, productId } = req.body;
  const { _id } = req.user;
  validateMongodbId(productId);
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);

    const alreadyRated = product.ratings?.find(
      (rating) => rating.postedBy.toString() === _id.toString()
    );

    if (alreadyRated) {
      await Product.updateOne(
        { ratings: { $elemMatch: alreadyRated } },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
          },
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star,
              comment,
              postedBy: _id,
            },
          },
        },
        { new: true }
      );
    }

    const getallratings = await Product.findById(productId);
    const totalrating = getallratings.ratings.reduce(
      (acc, curr) => acc + curr.star,
      0
    );
    const ratinglength = getallratings.ratings.length;
    let actualRating = Math.round(totalrating / ratinglength);
    let finalProduct = await Product.findByIdAndUpdate(
      productId,
      { totalrating: actualRating },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

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

module.exports = {
  createProduct,
  getallProducts,
  getaProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImage,
};
