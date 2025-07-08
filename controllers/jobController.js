const { default: Job } = require("../models/Job");



const postjob = async (req, res) => {
    
  try{
    const newjob = new Job(req.body);
    console.log(newjob);
    const savedJob = await newjob.save();
    return res.status(201).json({message: "Job posted successfully", job: savedJob});
  }catch(error){
    console.error("Error posting job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const allJobs = async (req, res) => {
    try{
        const jobs = await Job.find();
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        }
        return res.status(200).json(jobs);
    }catch{
        // console.error("Error fetching all jobs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    allJobs,
    postjob
};
