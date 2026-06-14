import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="bottom-tab-bar" aria-label="Main navigation">
      <button
        className={`tab-btn${isHome ? ' active' : ''}`}
        onClick={() => navigate('/')}
        aria-label="Home"
      >
        <Icon.Home size={22} />
        <span>Home</span>
      </button>

      <button
        className="tab-btn"
        aria-label="Saved"
      >
        <Icon.Heart size={22} />
        <span>Saved</span>
      </button>

      {/* Center logo button */}
      <button
        className="tab-btn-logo"
        onClick={() => navigate('/')}
        aria-label="stay and eat home"
      >
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <path d="M16 4 4 14v15h9v-9h6v9h9V14z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        className="tab-btn"
        aria-label="Profile"
        onClick={() => navigate('/login')}
      >
        <Icon.User size={22} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
