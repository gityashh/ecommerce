const blogCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");

// create category

const createblogCategory = asyncHandler(async (req, res) => {
    try {
        const newblogCategory = await blogCategory.create(req.body);
        res.json(newblogCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const updateblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await blogCategory.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// delete category

const deleteblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await blogCategory.findByIdAndDelete(id);
        res.json({ message: "blogCategory deleted successfully" });
    } catch (error) {
        throw new Error(error);
    }
});

// get category

const getblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await blogCategory.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// get all categories

const getallblogCategory = asyncHandler(async (req, res) => {
    try {
        const getallCategory = await blogCategory.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createblogCategory, updateblogCategory, deleteblogCategory, getblogCategory, getallblogCategory }; 
