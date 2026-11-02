const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        companyName: {
            type: String,
            required: true
        },

        jobRole: {
            type: String,
            required: true
        },

        applicationDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Shortlisted",
                "Interview",
                "Selected",
                "Rejected"
            ],
            default: "Applied"
        },

        location: {
            type: String,
            default: ""
        },

        jobType: {
            type: String,
            enum: [
                "Full Time",
                "Internship",
                "Part Time"
            ],
            default: "Full Time"
        },

        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Application",
    applicationSchema
);