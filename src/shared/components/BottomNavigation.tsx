import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: '홈', path: '/', icon: '🏠' },
  { label: '랭킹', path: '/ranking', icon: '🏆' },
];

export const BottomNavigation= () => {
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
      background: 'rgba(255, 255, 255, 0.25)', // 글래스모피즘 배경
      borderTop: '1px solid rgba(255, 255, 255, 0.3)', // 글래스모피즘 테두리
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // 글래스모피즘 그림자
      backdropFilter: 'blur(10px)', // 글래스모피즘 블러
      WebkitBackdropFilter: 'blur(10px)', // 사파리 지원
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
            color: location.pathname === item.path ? '#000' : '#888',
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