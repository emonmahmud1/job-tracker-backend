const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();



router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "User data retrieved successfully",
    user: req.user,
  });
});

module.exports = router;