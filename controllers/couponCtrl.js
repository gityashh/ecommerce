const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const coupon = await Coupon.create({ name });
        res.json(coupon);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createCoupon,
};