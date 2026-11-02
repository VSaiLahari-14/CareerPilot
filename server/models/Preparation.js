
const mongoose = require("mongoose");

const preparationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        topicName: {
            type: String,
            required: true
        },

        category: {
            type: String,
            enum: [
                "Programming",
                "Data Structures",
                "Database",
                "Core Subjects",
                "Aptitude",
                "Communication",
                "Interview Preparation",
                "Other"
            ],
            default: "Other"
        },

        status: {
            type: String,
            enum: [
                "Not Started",
                "In Progress",
                "Completed"
            ],
            default: "Not Started"
        },

        progress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
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
    "Preparation",
    preparationSchema
);
