const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    addSkill,
    getSkills,
    updateSkill,
    deleteSkill
} = require("../controllers/skillController");

const router = express.Router();

router.post(
    "/",
    protect,
    addSkill
);

router.get(
    "/",
    protect,
    getSkills
);

router.put(
    "/:id",
    protect,
    updateSkill
);

router.delete(
    "/:id",
    protect,
    deleteSkill
);

module.exports = router;