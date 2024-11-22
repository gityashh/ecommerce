const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  getAllUsers,
  getaUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,  
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.put("/save-address", authMiddleware, saveAddress);
router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
router.delete("/cart", authMiddleware, emptyCart); 
router.post("/reset-password/:token", resetPassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/password", authMiddleware, updatePassword);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.post("/admin-login", loginAdmin);

module.exports = router;
