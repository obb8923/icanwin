import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: '홈', path: '/', icon: '🏠' },
  { label: '랭킹', path: '/ranking', icon: '🏆' },
];

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      height: '60px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      background: '#fff',
      borderTop: '1px solid #eee',
      zIndex: 100,
    }}>
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: location.pathname === item.path ? '#2563eb' : '#888',
            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '24px' }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation; 