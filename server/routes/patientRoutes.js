const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route: React calls this
router.post('/analyze', async (req, res) => {
    try {
        const { history } = req.body;
        
        console.log("Received request from React. Calling Java...");

        // Call JAVA AI ENGINE on Port 8080
        const javaResponse = await axios.post('http://localhost:8080/api/summary', 
            history, // Sending the string directly as Java expects
            { headers: { 'Content-Type': 'text/plain' } } // Important for Java String body
        );

        console.log("Java replied:", javaResponse.data);
        
        // Send answer back to React
        res.json(javaResponse.data);

    } catch (error) {
        console.error("Error in AI Bridge:", error.message);
        res.status(500).json({ error: "Failed to process AI request" });
    }
});

module.exports = router;