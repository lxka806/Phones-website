const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Phone = require("../models/phones.model");
const { imageUpload, deleteImage } = require("../utils/image");

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
// CREATE
const addPhone = catchAsync(async (req, res, next) => {
    // 1. Create the phone instance first
    const newPhone = await Phone.create(req.body);
    
    // 2. Check if files were actually uploaded
    if (req.files && req.files.length > 0) {
        // Safe to map now
        const images = req.files.map(file => file.path);

        const result = await imageUpload("phones", images);

        // Optional chaining (?.) protects against result.result being undefined
        const imagesUrls = result?.result?.map(img => ({
            public_Id: img.public_id,
            url: img.secure_url
        })) || [];

        newPhone.images = imagesUrls;
        await newPhone.save();
    }

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