const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    addApplication,
    getApplications,
    updateApplication,
    deleteApplication
} = require("../controllers/applicationController");

const router = express.Router();


// Add Application

router.post(
    "/",
    protect,
    addApplication
);


// Get Applications

router.get(
    "/",
    protect,
    getApplications
);


// Update Application

router.put(
    "/:id",
    protect,
    updateApplication
);


// Delete Application

router.delete(
    "/:id",
    protect,
    deleteApplication
);


module.exports = router;