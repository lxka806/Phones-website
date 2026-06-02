const cloudinary = require("../config/cloudinary.js")

const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    resource_type: "image",
    quality: "auto",
    format: "webp",
    transformation: [
        { width: 500, height: 500, crop: "fit", gravity: "center"}
    ]
};

const imageUpload = async (folder, files) => {
    try {
        const uploadedPromises = files.map(file => cloudinary.v2.uploader.upload(file, {...options, folder}));

        const results = await Promise.all(uploadedPromises);

        return results
    } catch(err) {
        return {message: "Error uploading image", error: err.message}
    }
};

const deleteImage = async publicId => {
    try {
        const result = await cloudinary.v2.uploader.destroy(publicId);
        return result;
    } catch(err) {
        return {message: "Error deleting image", error: err.message}
    }
}


module.exports = {
    imageUpload,
    deleteImage
}