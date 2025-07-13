import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    company: String,
    location: String,
    salary: Number,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deadline: { type: Date },
    category: {
      type: String,
      enum: [
        "IT",
        "Finance",
        "Marketing",
        "Sales",
        "Human Resources",
        "Operations",
        "Customer Service",
        "Legal",
        "Healthcare",
        "Education",
      ],
      required: true,
    },
    industryType: {
      type: String,
      enum: ["Govt", "Semi-Govt", "Private", "International", "NGO"],
      required: true,
    },
    requirements: {
      type: [String], 
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
