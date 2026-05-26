import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import useAuthStore from '../../../store/authStore';

const LoginPage = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: '40px 20px',
  };

  const cardStyle = {
    maxWidth: '420px',
    width: '100%',
    padding: '40px 32px',
    borderRadius: '16px',
    border: '1px solid var(--border)',
    background: 'var(--social-bg)',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--text-h)',
    margin: '0 0 8px',
    textAlign: 'center',
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: 'var(--text)',
    margin: 0,
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--text-h)',
    marginBottom: '6px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text-h)',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
    opacity: isLoading ? 0.7 : 1,
  };

  const btnStyle = {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    fontWeight: '600',
    fontSize: '15px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    marginTop: '8px',
    transition: 'opacity 0.2s',
    opacity: isLoading ? 0.7 : 1,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser({ email, password });
      console.log('Login successful:', data);
      login({ user: data.user, token: data.token });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="mb-4 inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold dark:bg-green-900/30 dark:text-green-300">
              ✓ Successfully Authenticated
            </div>
            <h2 style={titleStyle}>Welcome back, {user.name}!</h2>
            <p style={subtitleStyle}>Your global auth state is active.</p>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 text-left">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Stored Auth State (Zustand):</h3>
            <div className="space-y-1 text-xs font-mono break-all text-gray-600 dark:text-gray-400">
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>User ID:</strong> {user.id}</div>
              <div><strong>Token:</strong> {token}</div>
            </div>
          </div>

          <button onClick={logout} style={btnStyle}>
            Sign Out
          </button>

          <div style={{ textAlign: 'center', fontSize: '14px' }}>
            <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <h2 style={titleStyle}>Welcome Back</h2>
          <p style={subtitleStyle}>Sign in to your Wanderlust account</p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-3.5 text-sm text-red-800 dark:text-red-400 rounded-lg bg-red-500/10 border border-red-500/20 text-left animate-shake" role="alert">
            <span className="text-base mt-0.5" aria-hidden="true">⚠️</span>
            <span className="font-medium text-red-700 dark:text-red-300">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" style={btnStyle} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '14px' }}>
          <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
