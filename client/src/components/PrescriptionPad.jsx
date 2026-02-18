import React, { useState, useEffect } from 'react';
import { FileText, Save, Printer } from 'lucide-react';

const PrescriptionPad = ({ patient }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [advice, setAdvice] = useState("");

  // Reset form when patient changes
  useEffect(() => {
    setDiagnosis("");
    setMedicines("");
    setAdvice("");
  }, [patient]);

  if (!patient) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <FileText size={24} />
        </div>
        <p>Select a patient to write a prescription</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 p-6 flex flex-col overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FileText size={20} /> Prescription Pad
            </h2>
            <p className="text-indigo-200 text-sm opacity-90">Patient: {patient.name}</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 flex-1 overflow-y-auto space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Diagnosis</label>
            <input 
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Viral Fever"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Rx (Medicines)</label>
            <textarea 
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
              placeholder="1. Tab. Paracetamol 500mg (1-0-1)"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Advice</label>
            <input 
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Drink warm water"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
            <Save size={18} /> Save Record
          </button>
          <button className="px-6 bg-white border border-slate-300 text-slate-600 rounded-lg font-bold flex items-center gap-2">
            <Printer size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default PrescriptionPad;