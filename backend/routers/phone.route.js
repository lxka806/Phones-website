const express = require("express");
const upload = require("../config/multer");
const { allowedTo } = require("../controllers/role.controller")
const { protect } = require("../middlewares/auth.middlewares");


const {
    getAllPhones,
    getPhoneByID,
    addPhone,
    updatePhone,
    deletePhone
} = require("../controllers/phone.controller");

const router = express.Router();

// SAME ENDPOINTS - just fixed to handle multiple images
router.get("/", getAllPhones);
router.get("/:id", getPhoneByID);
router.post("/", protect, allowedTo("admin"), upload.array("images", 5), addPhone);
router.put("/:id", protect, allowedTo("admin"), upload.array("images", 5), updatePhone);
router.delete("/:id", protect, allowedTo("admin"), deletePhone);

module.exports = router;