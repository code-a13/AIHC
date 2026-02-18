const axios = require('axios');

// Function to call Java Spring Boot Service
const getAnalysisFromJava = async (patientData) => {
    try {
        const javaUrl = process.env.JAVA_AI_SERVICE_URL;
        
        // Sending data to Java
        // Assuming Java expects: { "text": "Patient symptoms..." }
        const payload = {
            text: `Patient ${patientData.name}, Age ${patientData.age}, Symptoms: ${patientData.symptoms}. History: ${patientData.medicalHistory}`
        };

        console.log("📡 Calling Java AI Service...", javaUrl);
        
        const response = await axios.post(`${javaUrl}/analyze`, payload);
        return response.data; // The AI answer from Java

    } catch (error) {
        console.error("Java Service Down or Error:", error.message);
        return "AI Service Unavailable (Mock Response): Based on symptoms, rest is advised."; // Fallback if Java is off
    }
};

module.exports = { getAnalysisFromJava };