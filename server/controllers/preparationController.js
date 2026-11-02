
const Preparation = require("../models/Preparation");

// Add preparation topic
const addPreparation = async (req, res) => {
    try {
        const { topicName, category, status, progress, notes } = req.body;

        if (!topicName) {
            return res.status(400).json({
                message: "Please enter topic name"
            });
        }

        const preparation = await Preparation.create({
            userId: req.user.id,
            topicName,
            category,
            status,
            progress,
            notes
        });

        res.status(201).json({
            message: "Preparation topic added successfully",
            preparation
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Get all preparation topics
const getPreparations = async (req, res) => {
    try {
        const preparations = await Preparation.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({ preparations });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Update preparation topic
const updatePreparation = async (req, res) => {
    try {
        const preparation = await Preparation.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!preparation) {
            return res.status(404).json({
                message: "Preparation topic not found"
            });
        }

        res.status(200).json({
            message: "Preparation topic updated successfully",
            preparation
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Delete preparation topic
const deletePreparation = async (req, res) => {
    try {
        const preparation = await Preparation.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!preparation) {
            return res.status(404).json({
                message: "Preparation topic not found"
            });
        }

        res.status(200).json({
            message: "Preparation topic deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    addPreparation,
    getPreparations,
    updatePreparation,
    deletePreparation
};
