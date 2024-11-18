const express = require("express");
const router = express.Router();
const { createProduct, getallProducts, getaProduct, updateProduct, deleteProduct, addToWishlist, rating } = require("../controllers/productCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getallProducts);
router.put("/rating", authMiddleware, rating);
router.post("/wishlist", authMiddleware, addToWishlist);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
