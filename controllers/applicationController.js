// const Application = require("../models/Application");
// const Job = require("../models/Job");
// const User = require("../models/User");

const { default: Application } = require("../models/Application");
const { default: Job } = require("../models/Job");

const applyToJob = async (req, res) => {
  try {
    const { jobId, applicantId, resume, coverLetter } = req.body;
    if (!jobId || !applicantId || !resume) {
      return res
        .status(400)
        .json({ message: "Job ID, Applicant ID, and Resume are required" });
    }
    const applied = await Application.findOne({ jobId, applicantId });
    if (applied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const applicant = await User.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }
    const application = new Application({
      jobId: jobId,
      applicantId: applicantId,
      resume,
      coverLetter: coverLetter || "",
    });

    await application.save();

    return res
      .status(201)
      .json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying to job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.find({
      applicantId: userId,
    }).toArray();
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
  getApplicationsByUser,
};
