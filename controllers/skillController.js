const Skill = require("../models/Skill");

const addSkill = async (req, res) => {

    try {

        const {
            skillName,
            category,
            level,
            progress
        } = req.body;

        if (!skillName) {
            return res.status(400).json({
                message: "Please enter skill name"
            });
        }

        const skill = await Skill.create({
            userId: req.user.id,
            skillName,
            category,
            level,
            progress
        });

        res.status(201).json({
            message: "Skill added successfully",
            skill
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


const getSkills = async (req, res) => {

    try {

        const skills = await Skill.find({
            userId: req.user.id
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            skills
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


const updateSkill = async (req, res) => {

    try {

        const skill = await Skill.findOneAndUpdate(
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

        if (!skill) {

            return res.status(404).json({
                message: "Skill not found"
            });

        }

        res.status(200).json({
            message: "Skill updated successfully",
            skill
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


const deleteSkill = async (req, res) => {

    try {

        const skill = await Skill.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!skill) {

            return res.status(404).json({
                message: "Skill not found"
            });

        }

        res.status(200).json({
            message: "Skill deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


module.exports = {
    addSkill,
    getSkills,
    updateSkill,
    deleteSkill
};