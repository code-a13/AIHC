import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div style={{ marginLeft: '256px', flex: 1, backgroundColor: '#f9fafb' }}>
        {activePage === 'Dashboard' && <Dashboard />}
        {activePage === 'Patients' && <div style={{ padding: '2rem', color: '#64748b' }}>Patients Coming Soon...</div>}
        {activePage === 'AI Consult' && <div style={{ padding: '2rem', color: '#64748b' }}>AI Consult Coming Soon...</div>}
        {activePage === 'Settings' && <div style={{ padding: '2rem', color: '#64748b' }}>Settings Coming Soon...</div>}
      </div>

    </div>
  );
}

export default App;