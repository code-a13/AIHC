import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity } from 'lucide-react';

// Import our new components
import PatientList from '../components/PatientList';
import PrescriptionPad from '../components/PrescriptionPad';
import PatientTimeline from '../components/PatientTimeline';

const Dashboard = () => {
  // 1. Data State
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 2. Selection State
  const [selectedPatient, setSelectedPatient] = useState(null);

  // 3. Fetch Data on Load
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/patients');
        setPatients(res.data);
      } catch (err) {
        console.error("Failed to fetch patients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2 text-indigo-700">
          <Activity size={24} />
          <h1 className="text-lg font-bold tracking-tight">MediFlow SmartPad</h1>
        </div>
      </header>

      {/* The 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: List */}
        <PatientList 
          patients={patients} 
          loading={loading}
          selectedId={selectedPatient?._id}
          onSelect={setSelectedPatient} 
        />

        {/* Center: Work */}
        <PrescriptionPad 
          patient={selectedPatient} 
        />

        {/* Right: History */}
        <PatientTimeline 
          patient={selectedPatient} 
        />

      </div>
    </div>
  );
};

export default Dashboard;