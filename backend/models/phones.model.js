const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true
    },
    model: {
        type: String,
        required: [true, "Model is required"]
    },
    releaseYear: {
        type: Number,
        required: [true, "Release year is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
        default: "USD"
    },
    specs: {
        display: {
            type: String,
            required: true
        },
        processor: {
            type: String,
            required: true
        },
        ram: {
            type: Number,
            required: true
        },
        storage: {
            type: Number,
            required: true
        },
        camera: {
            type: Number,
            required: true
        },
        battery: {
            type: Number,
            required: true
        }
    },
    options: {
        type: [String],
        default: []
    },
    inStock: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}, { timestamps: true });

module.exports = mongoose.model("Phone", phoneSchema);