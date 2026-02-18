import React from 'react';
import { Home, Users, Activity, Settings, Heart } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Patients', icon: Users },
    { name: 'AI Consult', icon: Activity },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div
      style={{
        width: '256px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#0f172a',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={16} color="white" fill="white" />
        </div>
        <div>
          <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '15px', margin: 0 }}>MediFlow</h1>
          <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>AI Health Suite</p>
        </div>
      </div>

      {/* Doctor Info */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>
          Dr
        </div>
        <div>
          <p style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: 0 }}>Dr. Smith</p>
          <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>General Physician</p>
        </div>
        <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ color: '#475569', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 12px', marginBottom: '8px' }}>
          Navigation
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: isActive ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
                background: isActive ? 'rgba(59,130,246,0.15)' : 'transparent',
                color: isActive ? '#60a5fa' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={18} />
              <span>{item.name}</span>
              {isActive && (
                <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ color: '#334155', fontSize: '11px', margin: 0 }}>v1.0.0 · MediFlow AI</p>
      </div>
    </div>
  );
};

export default Sidebar;