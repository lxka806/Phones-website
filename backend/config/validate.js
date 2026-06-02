// config/validate.js
const cloudinary = require("./cloudinary");

const validateCloudinary = async () => {
    try {
        // Test Cloudinary connection
        const result = await cloudinary.api.ping();
        if (result.status === "ok") {
            console.log("✅ Cloudinary connected successfully");
            return true;
        }
    } catch (error) {
        console.error("❌ Cloudinary connection failed:", error.message);
        return false;
    }
};

module.exports = { validateCloudinary };