const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");

// create category

const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});

const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await Brand.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// delete category

const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await Brand.findByIdAndDelete(id);
        res.json({ message: "Brand deleted successfully" });
    } catch (error) {
        throw new Error(error);
    }
});

// get category

const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await Brand.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// get all categories

const getallBrand = asyncHandler(async (req, res) => {
    try {
        const getallCategory = await Brand.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createBrand, updateBrand, deleteBrand, getBrand, getallBrand }; 
