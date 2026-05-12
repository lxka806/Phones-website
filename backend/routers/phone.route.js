const express = require("express");
const router = express.Router();

const {
    getAllPhones,
    getPhoneByID,
    addPhone,
    updatePhone,
    deletePhone
} = require("../controllers/phone.controller");
const { protect } = require('../middlewares/auth.middlewares')
const { allowedTo } = require('../controllers/role.controller')

router
    .route("/")
    .get(getAllPhones)
    .post(protect, allowedTo('admin'), addPhone);

router
    .route("/:id")
    .get(getPhoneByID)
    .put(protect, allowedTo('admin'), updatePhone)
    .delete(protect, allowedTo('admin'), deletePhone);

module.exports = router;