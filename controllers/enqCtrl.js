const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");

// create category

const createEnquiry = asyncHandler(async (req, res) => {
    try {
        const newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

const updateEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// delete category

const deleteEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await Enquiry.findByIdAndDelete(id);
        res.json({ message: "Enquiry deleted successfully" });
    } catch (error) {
        throw new Error(error);
    }
});

// get category

const getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await Enquiry.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// get all categories

const getallEnquiry = asyncHandler(async (req, res) => {
    try {
        const getallCategory = await Enquiry.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getallEnquiry }; 
