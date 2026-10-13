const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        skillName: {
            type: String,
            required: true
        },

        category: {
            type: String,
            enum: [
                "Programming",
                "Database",
                "Web Development",
                "Cloud",
                "Tools",
                "Soft Skills",
                "Other"
            ],
            default: "Other"
        },

        level: {
            type: String,
            enum: [
                "Beginner",
                "Intermediate",
                "Advanced"
            ],
            default: "Beginner"
        },

        progress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Skill",
    skillSchema
);