const cloudinary = require("cloudinary").v2

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

const imageUpload = async(folder, files) => {
    try{
        const uploadImage = await files.map(file => cloudinary.v2.uploader.upload(file, { ...options, folder }))
        return { result: uploadImage }
    }catch(e){
        return { error: e.message }
    }
}


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