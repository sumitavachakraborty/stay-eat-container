import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import { login } from '../lib/api.js';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      const token = data.token ?? data.access_token ?? data.jwt;
      if (!token) throw new Error('No token in response');
      localStorage.setItem('se_token', token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="app"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--c-canvas)',
        padding: '0 16px',
      }}
    >
      {/* Card */}
      <div
        className="login-card"
        style={{
          border: '1px solid var(--c-hairline)',
          borderRadius: 22,
          padding: '40px 40px 36px',
          background: '#fff',
          boxShadow: '0 8px 40px rgba(0,0,0,.06)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <Logo size={30} />
        </div>

        <h1
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            margin: '0 0 6px',
            color: 'var(--c-near-black)',
            textAlign: 'center',
          }}
        >
          Welcome back
        </h1>
        <p style={{ color: 'var(--c-slate)', fontSize: 14, textAlign: 'center', margin: '0 0 28px' }}>
          Sign in to book your next stay
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-near-black)', display: 'block', marginBottom: 6 }}>
              Email address
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--c-hairline)',
                borderRadius: 12,
                fontSize: 14,
                fontFamily: 'var(--f-body)',
                color: 'var(--c-ink)',
                background: '#fff',
                outline: 'none',
                transition: 'border-color .15s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--c-near-black)'; }}
              onBlur={(e)  => { e.target.style.borderColor = 'var(--c-hairline)'; }}
            />
          </label>

          {/* Password */}
          <label style={{ display: 'block', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-near-black)', display: 'block', marginBottom: 6 }}>
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--c-hairline)',
                borderRadius: 12,
                fontSize: 14,
                fontFamily: 'var(--f-body)',
                color: 'var(--c-ink)',
                background: '#fff',
                outline: 'none',
                transition: 'border-color .15s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--c-near-black)'; }}
              onBlur={(e)  => { e.target.style.borderColor = 'var(--c-hairline)'; }}
            />
          </label>

          {/* Error */}
          {error && (
            <div
              style={{
                marginBottom: 12,
                padding: '10px 14px',
                background: '#fff0f0',
                border: '1px solid #f5c0c0',
                borderRadius: 10,
                fontSize: 13,
                color: 'var(--c-error)',
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              marginTop: 16,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in…' : 'Continue'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--c-hairline)' }} />
          <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--c-hairline)' }} />
        </div>

        {/* Sign-up link */}
        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--c-slate)', margin: 0 }}>
          New to stay and eat?{' '}
          <Link
            to="/signup"
            style={{ color: 'var(--c-coral)', fontWeight: 600, textDecoration: 'none' }}
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Back link */}
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: 24,
          background: 'none',
          border: 0,
          cursor: 'pointer',
          fontSize: 13,
          color: 'var(--c-slate)',
          fontFamily: 'var(--f-body)',
        }}
      >
        ← Back to stay and eat
      </button>
    </div>
  );
}
