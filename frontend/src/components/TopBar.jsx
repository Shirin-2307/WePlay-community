import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // ما نعرض الناف بار في صفحات اللوغين والريجستر لو حبيتي
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const linkStyle = ({ isActive }) => ({
    padding: '6px 0',
    borderBottom: isActive ? '3px solid #7b5cff' : '3px solid transparent',
    fontWeight: isActive ? 600 : 500,
    color: isActive ? '#1f2933' : '#4f5b6b'
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header
      style={{
        height: 68,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        borderBottom: '1px solid rgba(123,92,255,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/src/assets/weplay-logo.png" alt="WePlay" style={{ height: 40 }} />
        <span style={{ fontWeight: 700, fontSize: 20, color: '#2f3a4b' }}>We Play</span>
      </div>

      <nav style={{ display: 'flex', gap: 28 }}>
        <NavLink to="/home" style={linkStyle}>Home</NavLink>
        <NavLink to="/activities" style={linkStyle}>Discover</NavLink>
        <NavLink to="/activities/new" style={linkStyle}>Buddy Up</NavLink>
        <NavLink to="/events" style={linkStyle}>Events</NavLink>
        <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
      </nav>

      <div style={{ display: 'flex', gap: 12 }}>
        {!token ? (
          <>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: '#fff',
                border: '1px solid rgba(123,92,255,0.35)',
                borderRadius: 999,
                padding: '8px 20px',
                fontWeight: 600
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: '#1f2933',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '8px 20px',
                fontWeight: 600
              }}
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 999,
              padding: '8px 20px',
              fontWeight: 600
            }}
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}
