const express = require("express");
const { createBlog, updateBlog } = require("../controllers/blogctrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");
const { getBlog, getAllBlogs, deleteBlog, likeBlog } = require("../controllers/blogctrl");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.post("/likes", authMiddleware, likeBlog);
 
module.exports = router;
