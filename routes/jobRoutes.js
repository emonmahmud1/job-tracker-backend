// routes/jobRoutes.js
const {
  allJobs,
  postjob,
  getJobById,
  deletejob,
  modifyJob
} = require("../controllers/jobController");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/alljobs", authMiddleware, allJobs);
router.post("/postjob", authMiddleware, postjob);
router.get("/:id", getJobById);
router.delete("/delete/:id", authMiddleware, deletejob);
router.put("/modify/:id", authMiddleware, modifyJob);

module.exports = router;
