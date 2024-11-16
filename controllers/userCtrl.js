const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../utils/validateMongodb");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists"); 
  }
});

// Login

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find User
  const findUser = await User.findOne({ email: email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser?._id, { refreshToken: refreshToken }, { new: true });
        res.cookie("refreshToken", refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json({ 
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName, 
      email: findUser?.email,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Email or Password");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No user found");
    jwt.verify(refreshToken, process.env.JWT_KEY, async (err, decoded) => {
        if (err || user.id !== decoded.id) throw new Error("Invalid refresh token");
        const accessToken = await generateToken(user?._id);
        res.json({ accessToken });
    });
})

// logout 

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken",{ httpOnly: true, secure: true });
        return res.json({ message: "Logged out successfully" });
    }
    await User.findByIdAndUpdate(user?._id, { refreshToken: "" });
    res.clearCookie("refreshToken",{ httpOnly: true, secure: true });   
    res.status(200).json({ message: "Logged out successfully" });
});

// get all users 

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allusers = await User.find();
    res.json(allusers);
  } catch (error) {
    throw new Error(error);
  }
});

// get a single user

const getaUser = asyncHandler(async (req, res) => {
  try {
      const { id } = req.params;
      validateMongodbId(id);
  const user = await User.findById(id);
  res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// get a DELETE user

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
    const user = await User.findByIdAndDelete(id);
    res.json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    throw new Error(error);
    }
});
  
// update user
 
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;  
    validateMongodbId(id);
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            firstName: req.body?.firstName,
            lastName: req.body?.lastName,
            email: req.body?.email,
            mobile: req.body?.mobile,
        },
          { new: true });
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// block user

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const blockUser = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
        res.json({
            message: "User blocked successfully",
            blockUser,
        });
    } catch (error) {
        throw new Error(error); 
    }
});

// unblock user

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const unblockUser = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
        res.json({
            message: "User unblocked successfully",
            unblockUser,
        });
    } catch (error) {
        throw new Error(error); 
    }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
    validateMongodbId(id);
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(id);
    if (user && (await user.isPasswordMatched(oldPassword))) {
      user.password = newPassword;
      await user.save();
      res.json({ message: "Password updated successfully" });
    } else {
      throw new Error("Invalid old password");
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => { });

module.exports = {
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
}; 