import React from 'react';
import { Users, Search } from 'lucide-react';

const PatientList = ({ patients, selectedId, onSelect, loading }) => {
  return (
    <div className="w-1/4 min-w-[300px] border-r border-slate-200 bg-white flex flex-col h-full">
      
      {/* 1. Stats Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Patients</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-slate-900">{patients.length}</span>
          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            Active Today
          </span>
        </div>
      </div>

      {/* 2. Search Bar (Visual) */}
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search name..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. Scrollable List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {loading ? (
          <p className="text-center p-4 text-slate-400 text-sm">Loading...</p>
        ) : (
          patients.map((p) => (
            <div 
              key={p._id}
              onClick={() => onSelect(p)}
              className={`p-3 rounded-lg cursor-pointer transition-all border border-transparent ${
                selectedId === p._id 
                  ? "bg-indigo-50 border-indigo-200 shadow-sm" 
                  : "hover:bg-slate-50 hover:border-slate-200"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-semibold text-sm ${selectedId === p._id ? "text-indigo-700" : "text-slate-700"}`}>
                  {p.name}
                </h3>
                <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 font-mono">
                  {p.age}Y
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                {p.history || "No history reported"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientList;