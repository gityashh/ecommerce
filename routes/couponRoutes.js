const express = require("express");
const { createCoupon, getAllCoupons, updateCoupon } = require("../controllers/couponCtrl");
const router = express.Router();

router.post("/", createCoupon);
router.get("/", getAllCoupons); 
router.put("/:id", updateCoupon);
module.exports = router;