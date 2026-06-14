import { useNavigate, useLocation } from 'react-router-dom';
import HearthLogo from './HearthLogo.jsx';
import Icon from './Icon.jsx';

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleHostToggle() {
    window.location.href = import.meta.env.VITE_HOST_APP_URL || 'http://localhost:3002';
  }

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 56px',
      borderBottom: '1px solid var(--c-hairline)',
      background: '#fff',
      position: 'relative',
      zIndex: 5,
    }}>
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
        aria-label="Go to home"
      >
        <HearthLogo />
      </button>

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 0,
            padding: '0 0 4px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            color: 'var(--c-near-black)',
            borderBottom: location.pathname === '/' ? '2px solid var(--c-near-black)' : '2px solid transparent',
            fontFamily: 'var(--f-body)',
          }}
        >
          Stays
        </button>
        <button
          style={{
            background: 'none',
            border: 0,
            padding: '0 0 4px',
            cursor: 'pointer',
            fontWeight: 400,
            fontSize: 14,
            color: 'var(--c-slate)',
            borderBottom: '2px solid transparent',
            fontFamily: 'var(--f-body)',
          }}
        >
          Experiences
        </button>
        <button
          style={{
            background: 'none',
            border: 0,
            padding: '0 0 4px',
            cursor: 'pointer',
            fontWeight: 400,
            fontSize: 14,
            color: 'var(--c-slate)',
            borderBottom: '2px solid transparent',
            fontFamily: 'var(--f-body)',
          }}
        >
          Quality checks
        </button>
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {/* Host / Traveller segmented toggle */}
        <div
          style={{
            display: 'flex',
            background: '#f4f4f6',
            borderRadius: 999,
            padding: 3,
            gap: 2,
          }}
          role="group"
          aria-label="Switch between Traveller and Host view"
        >
          {/* Traveller — active segment (this app) */}
          <button
            style={{
              background: 'var(--c-near-black)',
              color: '#fff',
              border: 0,
              borderRadius: 999,
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'var(--f-body)',
              cursor: 'default',
              transition: 'background .2s',
            }}
            aria-pressed="true"
          >
            Traveller
          </button>
          {/* Host — switches to host app */}
          <button
            onClick={handleHostToggle}
            style={{
              background: 'transparent',
              color: 'var(--c-slate)',
              border: 0,
              borderRadius: 999,
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'var(--f-body)',
              cursor: 'pointer',
              transition: 'background .2s, color .2s',
            }}
            aria-pressed="false"
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--c-near-black)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--c-slate)'; }}
          >
            Host
          </button>
        </div>

        <button
          style={{ background: 'transparent', border: 0, padding: 6, cursor: 'pointer', color: 'var(--c-slate)' }}
          aria-label="Language"
        >
          <Icon.Globe />
        </button>

        {/* User menu pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 8px 6px 14px',
            border: '1px solid var(--c-hairline)',
            borderRadius: 999,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/login')}
          title="Log in"
        >
          <Icon.Menu />
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#ffad9b,#ff7759)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            <Icon.User size={15} />
          </div>
        </div>
      </div>
    </header>
  );
}
