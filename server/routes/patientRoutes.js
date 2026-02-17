const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Define URLs
router.post('/', patientController.addPatient);           // Create
router.get('/', patientController.getAllPatients);        // List
router.post('/:id/analyze', patientController.analyzePatient); // Trigger AI

module.exports = router;