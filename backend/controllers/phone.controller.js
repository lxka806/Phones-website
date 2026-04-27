const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Phone = require("../models/phones.model");

// GET ALL
const getAllPhones = catchAsync(async (req, res, next) => {
    const phones = await Phone.find();
    res.status(200).json({
        status: "success",
        results: phones.length,
        data: phones
    });
});

// GET BY ID
const getPhoneByID = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const phone = await Phone.findById(id);

    if (!phone) {
        return next(new AppError("Phone not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: phone
    });
});

// CREATE
const addPhone = catchAsync(async (req, res, next) => {
    const newPhone = await Phone.create(req.body);
    console.log("BODY:", req.body);

    res.status(201).json({
        status: "success",
        data: newPhone
    });
});

const updatePhone = catchAsync(async (req, res, next) => {

    const updatedPhone = await Phone.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedPhone) {
        return next(new AppError("Phone not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: updatedPhone
    });
});

// DELETE
const deletePhone = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const deletedPhone = await Phone.findByIdAndDelete(id);

    if (!deletedPhone) {
        return next(new AppError("Phone not found", 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

module.exports = {
    getAllPhones,
    getPhoneByID,
    addPhone,
    updatePhone,
    deletePhone
};