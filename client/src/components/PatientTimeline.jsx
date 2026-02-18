import React from 'react';
import { History, Calendar } from 'lucide-react';

const PatientTimeline = ({ patient }) => {
  // Mock data generator for visual effect
  const events = patient ? [
    { date: "Today", title: "Current Visit", desc: "Consultation in progress..." },
    { date: "Reported History", title: "Symptoms", desc: patient.history || "No details provided." },
    { date: "Registration", title: "Joined MediFlow", desc: "New patient entry created." }
  ] : [];

  return (
    <div className="w-1/4 min-w-[300px] border-l border-slate-200 bg-white flex flex-col h-full">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <History size={18} className="text-orange-500" /> Patient History
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!patient ? (
          <div className="text-center mt-20 opacity-50">
            <Calendar size={40} className="mx-auto mb-2" />
            <p className="text-sm">No patient selected</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-indigo-100 ml-3 space-y-8 pb-10">
            {events.map((event, idx) => (
              <div key={idx} className="relative pl-6">
                {/* The Dot */}
                <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${idx === 0 ? "bg-indigo-600 ring-4 ring-indigo-50" : "bg-slate-300"}`}></span>
                
                <p className="text-xs font-bold text-indigo-900 mb-1">{event.date}</p>
                <h4 className="text-sm font-semibold text-slate-800">{event.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTimeline;