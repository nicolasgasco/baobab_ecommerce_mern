const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        minLength: [2, "Translation too short"],
        maxLength: [25, "Translation too long"],
        lowercase: true,
        trim: true,
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

// const Department = mongoose.model("Department", departmentSchema);

// arr = [
//   {
//     name: "automotive",
//     translations: { es_es: "Coche y Moto", en_us: "Automotive" },
//   },
//   {
//     name: "baby",
//     translations: { es_es: "Bebé", en_us: "Baby" },
//   },
//   {
//     name: "beauty",
//     translations: { es_es: "Belleza", en_us: "Beauty" },
//   },
//   {
//     name: "sports",
//     translations: { es_es: "Deportes", en_us: "Sports" },
//   },
//   {
//     name: "electronics",
//     translations: { es_es: "Electrónica", en_us: "Electronics" },
//   },
//   {
//     name: "luggage",
//     translations: { es_es: "Equipaje", en_us: "Luggage" },
//   },
//   {
//     name: "toys",
//     translations: { es_es: "Juguetes", en_us: "Toys" },
//   },
//   {
//     name: "fashion",
//     translations: { es_es: "Ropa", en_us: "Fashion" },
//   },
//   {
//     name: "shoes",
//     translations: { es_es: "Zapatos", en_us: "Shoes" },
//   },
// ];

// Department.insertMany(arr, function (err, docs) {
//   console.log(docs);
// });


module.exports = departmentSchema;
