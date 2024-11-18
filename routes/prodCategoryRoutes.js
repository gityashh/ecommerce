const express = require("express");
const { createProdCategory, updateProdCategory, deleteProdCategory, getProdCategory, getallProdCategory } = require("../controllers/prodCategoryCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");

router.post("/", authMiddleware, isAdmin, createProdCategory);
router.put("/:id", authMiddleware, isAdmin, updateProdCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteProdCategory);
router.get("/:id", getProdCategory);
router.get("/", getallProdCategory);
module.exports = router;
