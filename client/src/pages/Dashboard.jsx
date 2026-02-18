import React from 'react';
import { Users, Calendar, FileText, Activity } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Patients', value: '1,240', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: "Today's Appointments", value: '12', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'AI Reports Generated', value: '85', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const appointments = [
    { name: 'Ravi Kumar',   time: '09:00 AM', type: 'General Checkup',  status: 'Confirmed' },
    { name: 'Priya Sharma', time: '10:30 AM', type: 'Follow-up',         status: 'Confirmed' },
    { name: 'Arun Patel',   time: '11:15 AM', type: 'AI Diagnosis',      status: 'Pending'   },
    { name: 'Meena Iyer',   time: '02:00 PM', type: 'Consultation',      status: 'Confirmed' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Good Morning, Doctor 👋</h2>
        <p className="text-sm text-gray-400 mt-1">Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">{s.label}</p>
                <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon size={17} className={s.color} />
                </div>
              </div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Today's Appointments</h3>
          <span className="text-xs bg-blue-50 text-blue-500 font-medium px-2.5 py-1 rounded-full">
            {appointments.length} scheduled
          </span>
        </div>

        <div className="divide-y divide-gray-50">
          {appointments.map((apt, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                style={{ background: `hsl(${i * 70 + 190}, 60%, 55%)` }}
              >
                {apt.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{apt.name}</p>
                <p className="text-xs text-gray-400">{apt.type}</p>
              </div>

              {/* Time */}
              <p className="text-sm text-gray-500 w-24 text-right">{apt.time}</p>

              {/* Status */}
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full w-20 text-center ${
                  apt.status === 'Confirmed'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-yellow-50 text-yellow-600'
                }`}
              >
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Consult CTA */}
      <div className="mt-5 bg-blue-500 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Activity size={18} color="white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">AI Consult Ready</p>
            <p className="text-blue-100 text-xs">Analyze patient symptoms instantly</p>
          </div>
        </div>
        <button className="bg-white text-blue-500 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
          Start Now →
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
