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
const addPhone = catchAsync(async (req, res, next) => {
    const body = req.body;

    if (body.specs && typeof body.specs === "string") {
        body.specs = JSON.parse(body.specs);
    }

    const images = req.files.map(file => file.path);

    const result = await imageUpload("phones", images);

    const imageUrls = result.map(img => ({
        url: img.secure_url,
        public_Id: img.public_id
    }));

    body.images = imageUrls;

    const newPhone = await Phone.create(body);

    return res.status(200).json(newPhone);
});

// UPDATE
const updatePhone = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    const updatedPhone = await Phone.findByIdAndUpdate(id, req.body, {new: true});
    if (!updatedPhone) {
        return next(new AppError("Phone not found", 404))
    }

    res.status(200).json(updatedPhone);
});


// DELETE
const deletePhone = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const deletedPhone = await Phone.findByIdAndDelete(id);

    if (deletedPhone === null) {
        return next(new AppError("Phone not found to delete!", 404));
    }

    const promises = deletedPhone.images.map(img =>
        deleteImage(img.public_Id)
    );

    await Promise.all(promises);

    return res.status(204).json({
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