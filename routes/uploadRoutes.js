const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");
const { uploadPhoto, productImageResize } = require("../middlewares/uploadImage");
const { uploadImage, deleteProductImage } = require("../controllers/uploadCtrl");

router.post(
  "/upload/",
  authMiddleware,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImage
);

router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteProductImage);

module.exports = router;
