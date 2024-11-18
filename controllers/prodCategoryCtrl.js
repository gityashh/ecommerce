const ProdCategory = require("../models/prodCategoryModel");
const asyncHandler = require("express-async-handler");

// create category

const createProdCategory = asyncHandler(async (req, res) => {
    try {
        const newProdCategory = await ProdCategory.create(req.body);
        res.json(newProdCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProdCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await ProdCategory.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// delete category

const deleteProdCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await ProdCategory.findByIdAndDelete(id);
        res.json({ message: "ProdCategory deleted successfully" });
    } catch (error) {
        throw new Error(error);
    }
});

// get category

const getProdCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await ProdCategory.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// get all categories

const getallProdCategory = asyncHandler(async (req, res) => {
    try {
        const getallCategory = await ProdCategory.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createProdCategory, updateProdCategory, deleteProdCategory, getProdCategory, getallProdCategory }; 
