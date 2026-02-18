const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    symptoms: { type: String, required: true }, // "Fever, cold, headache"
    medicalHistory: { type: String, default: "None" },
    
    // filled by java AI
    aiDiagnosis: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', PatientSchema);