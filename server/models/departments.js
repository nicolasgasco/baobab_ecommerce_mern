const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        minLength: [2, "Translation too short"],
        maxLength: [25, "Translation too long"],
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, "Translation is required"],
        },
        translations: {
            es_es: 
            {
                type: String, 
                minLength: [2, "Translation too short"],
                maxLength: [25, "Translation too long"],
                trim: true,
                required: [true, "Translation is required"],
            },
            en_us: {
                type: String, 
                minLength: [2, "Translation too short"],
                maxLength: [25, "Translation too long"],
                trim: true,
                required: [true, "Translation is required"],
            },
        },
    },
  { collection: "departments" }
);

module.exports = departmentSchema;
