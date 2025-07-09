const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminAuth = require("../middlewares/isAdminAuth");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/", authMiddleware, isAdminAuth, getAllUsers);
router.get("/:id", authMiddleware, isAdminAuth, getUserById);

module.exports = router;
