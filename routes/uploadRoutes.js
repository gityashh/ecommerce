const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");
const { uploadPhoto, productImageResize } = require("../middlewares/uploadImage");
const { uploadProductImage, deleteProductImage } = require("../controllers/uploadCtrl");

router.post(
  "/",
  authMiddleware,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadProductImage
);

router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteProductImage);

module.exports = router;
