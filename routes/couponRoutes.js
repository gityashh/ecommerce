const express = require("express");
const { createCoupon } = require("../controllers/couponCtrl");
const router = express.Router();

router.post("/", createCoupon);

module.exports = router;