const { default: Job } = require("../models/Job");

const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      deadline,
      category,
    } = req.body;
    const newjob = new Job({
      title,
      description,
      company,
      location,
      salary,
      deadline,
      category,
      postedBy: req.user.id,
    });
    const savedJob = await newjob.save();
    return res
      .status(201)
      .json({ message: "Job posted successfully", job: savedJob });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const allJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    return res.status(200).json(jobs);
  } catch {
    // console.error("Error fetching all jobs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getJobById = async (req, res) => {
  try {
    const jobid = req.params.id;
    const job = await Job.findById(jobid);
    if (!job) {
      return res.status(404).json({ message: "job not found" });
    }
    return res.status(200).json({ message: "job found successfully", job });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deletejob = async (req, res) => {
  try {
    const jobid = req.params.id;
    const job = await Job.findById(jobid);
    if (job.postedBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "unauthorized to delete this job" });
    }
    const deletedJob = await Job.findByIdAndDelete(jobid);
    if (!deletedJob) {
      return res.status(404).json({ message: "job not found" });
    }
    return res.status(200).json({ message: "job deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const modifyJob = async (req, res) => {
  try {
    const jobid = req.params.id;
    // console.log(jobid);
    const jobToUpdate = await Job.findById(jobid);
    if (!jobToUpdate) {
      return res.status(404).json({ message: "job not found to update" });
    }
    // console.log(jobToUpdate.postedBy.toString(), req.user.id);
    if (jobToUpdate.postedBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "unauthorized to update this job" });
    }
    const updatedJob = await Job.findByIdAndUpdate(
      jobid,
      { ...req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "job updated successfully", job: updatedJob });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const jobAddByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const postedJobs = await Job.find({ postedBy: userId });
    if (!postedJobs || postedJobs.length == 0) {
      return res
        .status(404)
        .json({ message: "you have not posted any job yet" });
    }
    return res
      .status(200)
      .json({ message: "your posted jobs", jobs: postedJobs });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  allJobs,
  postjob,
  getJobById,
  deletejob,
  modifyJob,
  jobAddByUser,
};
