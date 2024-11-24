const express = require("express");
const { createBlog, updateBlog } = require("../controllers/blogctrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");
const {
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImage,
} = require("../controllers/blogctrl");

router.get("/", getAllBlogs);
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/upload/:id", authMiddleware, isAdmin, uploadImage);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
module.exports = router;
