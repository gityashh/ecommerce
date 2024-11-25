const express = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getallEnquiry } = require("../controllers/enqCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/:id", getEnquiry);
router.get("/", authMiddleware, isAdmin, getallEnquiry);
module.exports = router;
