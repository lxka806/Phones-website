const express = require("express");
const router = express.Router();

const {
    getAllPhones,
    getPhoneByID,
    addPhone,
    updatePhone,
    deletePhone
} = require("../controllers/phone.controller");

router
    .route("/")
    .get(getAllPhones)
    .post(addPhone);

router
    .route("/:id")
    .get(getPhoneByID)
    .put(updatePhone)
    .delete(deletePhone);

module.exports = router;