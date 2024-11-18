const express = require("express");
const { createblogCategory, updateblogCategory, deleteblogCategory, getblogCategory, getallblogCategory } = require("../controllers/blogCategoryCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");

router.post("/", authMiddleware, isAdmin, createblogCategory);
router.put("/:id", authMiddleware, isAdmin, updateblogCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteblogCategory);
router.get("/:id", getblogCategory);
router.get("/", getallblogCategory);
module.exports = router;
