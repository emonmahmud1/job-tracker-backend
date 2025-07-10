const { default: User } = require("../models/User");
const { signToken } = require("../authentication/jwtToken");

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.name || !userData.email || !userData.password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length == 0) {
      return res.status(404).json({ message: "Users not found" });
    }
    return res
      .status(200)
      .json({
        message: "Users found successfully",
        totalUsers: users.length,
        users: users,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "user not found" });
    }
    if (findUser.password !== password || findUser.email !== email) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    const token = signToken(findUser);
    return res
      .status(200)
      .json({
        message: "login successful",
        user: { email: findUser.email, id: findUser._id, role: findUser.role },
        token,
      });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById
};
