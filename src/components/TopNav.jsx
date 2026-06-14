import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleHostToggle() {
    window.location.href = import.meta.env.VITE_HOST_APP_URL || 'http://localhost:3002';
  }

  return (
    <header
      className="topnav"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--c-hairline)',
        background: '#fff',
        position: 'relative',
        zIndex: 5,
      }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
        aria-label="Go to home"
      >
        <Logo />
      </button>

      {/* Center nav links — hidden on mobile via CSS class */}
      <nav className="topnav-center-links" style={{ gap: 28, alignItems: 'center' }}>
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
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {/* Host / Traveller segmented toggle — always visible */}
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
              minHeight: 44,
            }}
            aria-pressed="true"
          >
            Traveller
          </button>
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
              minHeight: 44,
            }}
            aria-pressed="false"
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--c-near-black)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--c-slate)'; }}
          >
            Host
          </button>
        </div>

        {/* Globe — hidden on mobile via inline flex-shrink and CSS */}
        <button
          className="topnav-center-links"
          style={{ background: 'transparent', border: 0, padding: 6, cursor: 'pointer', color: 'var(--c-slate)' }}
          aria-label="Language"
        >
          <Icon.Globe />
        </button>

        {/* User menu pill — desktop only */}
        <div
          className="topnav-center-links"
          style={{
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

        {/* Hamburger — mobile only */}
        <button
          className="topnav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            background: 'transparent',
            border: '1px solid var(--c-hairline)',
            borderRadius: 999,
            padding: '8px 10px',
            cursor: 'pointer',
            color: 'var(--c-near-black)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            minHeight: 44,
          }}
          aria-label="Menu"
        >
          <Icon.Menu size={18} />
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#ffad9b,#ff7759)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon.User size={13} style={{ color: '#fff' }} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            left: 0,
            background: '#fff',
            borderBottom: '1px solid var(--c-hairline)',
            padding: '12px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            zIndex: 20,
            boxShadow: '0 8px 24px rgba(0,0,0,.08)',
          }}
        >
          <button
            onClick={() => { navigate('/'); setMenuOpen(false); }}
            style={{ background: 'none', border: 0, textAlign: 'left', padding: '10px 0', fontSize: 15, fontFamily: 'var(--f-body)', fontWeight: location.pathname === '/' ? 600 : 400, cursor: 'pointer' }}
          >
            Stays
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ background: 'none', border: 0, textAlign: 'left', padding: '10px 0', fontSize: 15, fontFamily: 'var(--f-body)', color: 'var(--c-slate)', cursor: 'pointer' }}
          >
            Experiences
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ background: 'none', border: 0, textAlign: 'left', padding: '10px 0', fontSize: 15, fontFamily: 'var(--f-body)', color: 'var(--c-slate)', cursor: 'pointer' }}
          >
            Quality checks
          </button>
          <button
            onClick={() => { navigate('/login'); setMenuOpen(false); }}
            style={{ background: 'none', border: 0, textAlign: 'left', padding: '10px 0', fontSize: 15, fontFamily: 'var(--f-body)', color: 'var(--c-slate)', cursor: 'pointer' }}
          >
            Log in / Sign up
          </button>
        </div>
      )}
    </header>
  );
}
