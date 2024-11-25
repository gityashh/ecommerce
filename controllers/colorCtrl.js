const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");

// create category

const createColor = asyncHandler(async (req, res) => {
    try {
        const newColor = await Color.create(req.body);
        res.json(newColor);
    } catch (error) {
        throw new Error(error);
    }
});

const updateColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await Color.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// delete category

const deleteColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await Color.findByIdAndDelete(id);
        res.json({ message: "Color deleted successfully" });
    } catch (error) {
        throw new Error(error);
    }
});

// get category

const getColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await Color.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// get all categories

const getallColor = asyncHandler(async (req, res) => {
    try {
        const getallCategory = await Color.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createColor, updateColor, deleteColor, getColor, getallColor }; 
