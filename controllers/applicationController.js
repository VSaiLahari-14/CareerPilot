const Application = require("../models/Application");


// Add Application

const addApplication = async (req, res) => {

    try {

        const {
            companyName,
            jobRole,
            applicationDate,
            status,
            location,
            jobType,
            notes
        } = req.body;

        if (!companyName || !jobRole || !applicationDate) {

            return res.status(400).json({
                message: "Please enter company name, job role and application date"
            });

        }

        const application = await Application.create({

            userId: req.user.id,

            companyName,
            jobRole,
            applicationDate,
            status,
            location,
            jobType,
            notes

        });

        res.status(201).json({

            message: "Application added successfully",

            application

        });

    } catch (error) {

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }
};


// Get Applications

const getApplications = async (req, res) => {

    try {

        const applications = await Application.find({
            userId: req.user.id
        }).sort({
            applicationDate: -1
        });

        res.status(200).json({

            applications

        });

    } catch (error) {

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }
};


// Update Application

const updateApplication = async (req, res) => {

    try {

        const application = await Application.findOneAndUpdate(

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

        if (!application) {

            return res.status(404).json({

                message: "Application not found"

            });

        }

        res.status(200).json({

            message: "Application updated successfully",

            application

        });

    } catch (error) {

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }
};


// Delete Application

const deleteApplication = async (req, res) => {

    try {

        const application = await Application.findOneAndDelete({

            _id: req.params.id,
            userId: req.user.id

        });

        if (!application) {

            return res.status(404).json({

                message: "Application not found"

            });

        }

        res.status(200).json({

            message: "Application deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }
};


module.exports = {

    addApplication,
    getApplications,
    updateApplication,
    deleteApplication

};