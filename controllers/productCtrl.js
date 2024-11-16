const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

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
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
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
        excludeFields.forEach(field => delete queryObj[field]);
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const query = JSON.parse(queryString);

        // sorting
        let sort = "-createdAt";
        if (req.query.sort) {
            sort = req.query.sort.split(",").join(" ");
        }
        else {
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
        const products = await Product.find(query).sort(sort).select(fields).skip(skip).limit(limit);
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

module.exports = { createProduct, getallProducts, getaProduct, updateProduct, deleteProduct }; 