import mongoose from "mongoose";  

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    coverLetter: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['applied', 'interviewed', 'offered', 'rejected'],
        default: 'applied',
    },
    }, {
    timestamps: true,
})
const Application = mongoose.model('Application', applicationSchema);

export default Application;