const express = require("express");
const router = express.Router();
const { createProduct, getallProducts, getaProduct, updateProduct, deleteProduct } = require("../controllers/productCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getallProducts);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
module.exports = router;