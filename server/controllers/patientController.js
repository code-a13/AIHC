const Patient = require('../models/Patient');
const { getAnalysisFromJava } = require('../services/aiBridge');

// 1. Add New Patient
exports.addPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Get All Patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Analyze Patient (Trigger AI)
exports.analyzePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) return res.status(404).json({ msg: "Patient not found" });

        // Call Java Service
        const aiResult = await getAnalysisFromJava(patient);

        // Save AI result back to DB
        patient.aiDiagnosis = typeof aiResult === 'string' ? aiResult : JSON.stringify(aiResult);
        await patient.save();

        res.status(200).json({ msg: "AI Analysis Complete", data: patient });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};