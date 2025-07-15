// const Application = require("../models/Application");
// const Job = require("../models/Job");
// const User = require("../models/User");

const { default: Application } = require("../models/Application");
const { default: Job } = require("../models/Job");
const { default: User } = require("../models/User");

const applyToJob = async (req, res) => {
  const { jobId } = req.body;
  const applicantId = req.user.id;

  try {
    const applicant = await User.findById(applicantId);
    const isApplied = await Application.findOne({ jobId, applicantId });
    const job = await Job.findById(jobId);

    if (applicant.role !== "user") {
      return res.status(403).json({ message: "Unauthorized to apply" });
    }
    if (job?.postedBy?.toString() === applicantId) {
      return res
        .status(403)
        .json({ message: "You are owner of this job post" });
    }

    if (isApplied) {
      return res.status(400).json({ message: "Already applied" });
    }
    const newApplication = new Application({
      jobId,
      applicantId,
      resume: applicant.resume,
    });
    const appliedJob = await newApplication.save();
    return res
      .status(201)
      .json({ message: "Application Submitted Successfully", appliedJob });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getAppliedJobsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const applications = await Application.find({
      applicantId: userId,
    });
    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found. Apply Now" });
    }
    return res
      .status(200)
      .json({ message: "Applications fetched successfully", applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  applyToJob,
  getAllApplications,
  getAppliedJobsByUser,
};
