const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getApplicationsByUser,
  getAllApplications,
} = require("../controllers/applicationController");

router.post("/apply", applyToJob);
router.get("/allapplications", getAllApplications);
router.get("/applied/:userId", getApplicationsByUser);

module.exports = router;
