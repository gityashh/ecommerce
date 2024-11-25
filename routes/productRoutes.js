const express = require("express");
const router = express.Router();
const {
  createProduct,
  getallProducts,
  getaProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImage,
  deleteProductImage,
} = require("../controllers/productCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");
const { uploadPhoto, productImageResize } = require("../middlewares/uploadImage");
router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getallProducts);
router.put("/rating", authMiddleware, rating);
router.post("/wishlist", authMiddleware, addToWishlist);
router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteProductImage);
router.put(
  "/upload/",
  authMiddleware,
  uploadPhoto.array("images", 10),
  uploadImage
);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
