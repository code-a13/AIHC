const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to access
app.use(express.json()); // Parse JSON body

// Database Connect
connectDB();

// Routes
app.use('/api/patients', patientRoutes);

// Health Check
app.get('/', (req, res) => res.send('Mediflow Node Server is Running!'));

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});