const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getAppliedJobsByUser,
  getAllApplications,
} = require("../controllers/applicationController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/apply", authMiddleware, applyToJob);
router.get("/all-applications", authMiddleware, getAllApplications);
router.get("/applied/:userId", authMiddleware, getAppliedJobsByUser);

module.exports = router;
