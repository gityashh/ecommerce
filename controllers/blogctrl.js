const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodb");
const fs = require("fs");
// create blog

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update blog

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      message: "Blog updated successfully",
      updateBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get a blog

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findById(id).populate("likes").populate("dislikes");
    // increase the number of views
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    );
    res.json({
      status: "success",
      message: "Blog fetched successfully",
      blog,
      updatedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all blogs

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({
      status: "success",
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete a blog

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    await Blog.findByIdAndDelete(id);
    res.json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// like a blog

const likeBlog = asyncHandler(async (req, res) => {
  const { id } = req.body;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findById(id);
    const loginUserId = req?.user?._id;
    const isLiked = blog?.isLiked;
    const alreadyDisliked = blog?.dislikes?.find(
      (id) => id?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        { $pull: { dislikes: loginUserId }, isDisliked: false },
        { new: true }
      );
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        { $pull: { likes: loginUserId }, isLiked: false },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        id,
        { $push: { likes: loginUserId }, isLiked: true },
        { new: true }
      );
    }
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

// dislike a blog

const dislikeBlog = asyncHandler(async (req, res) => {
  const { id } = req.body;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findById(id);
    const loginUserId = req?.user?._id;
    const isDisliked = blog?.isDisliked;
    const alreadyLiked = blog?.likes?.find(
      (id) => id?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        { $pull: { likes: loginUserId }, isLiked: false },
        { new: true }
      );
    }
    if (isDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        { $pull: { dislikes: loginUserId }, isDisliked: false },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        id,
        { $push: { dislikes: loginUserId }, isDisliked: true },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

// upload product images
const uploadImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
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

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => file), // Map and save the URLs to the product
      },
      { new: true } // Return the updated document
    );
    res.json(blog);
  } catch (error) {
    throw new Error(error.message || "Failed to upload image");
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImage,
};
