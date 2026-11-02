
const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    addPreparation,
    getPreparations,
    updatePreparation,
    deletePreparation
} = require("../controllers/preparationController");

const router = express.Router();

// Add preparation topic
router.post("/", protect, addPreparation);

// Get all preparation topics
router.get("/", protect, getPreparations);

// Update preparation topic
router.put("/:id", protect, updatePreparation);

// Delete preparation topic
router.delete("/:id", protect, deletePreparation);

module.exports = router;
