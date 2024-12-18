const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Coupon name is required"],
        unique: true,
        uppercase: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Coupon", couponSchema);