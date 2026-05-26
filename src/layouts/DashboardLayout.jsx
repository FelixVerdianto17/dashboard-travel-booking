import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--bg)',
    color: 'var(--text)',
  };

  const sidebarStyle = {
    width: '260px',
    borderRight: '1px solid var(--border)',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    boxSizing: 'border-box',
    background: 'var(--social-bg)',
  };

  const brandStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: 'var(--text-h)',
    textDecoration: 'none',
  };

  const menuStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: isActive ? 'var(--accent)' : 'var(--text)',
    background: isActive ? 'var(--accent-bg)' : 'transparent',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.2s',
  });

  const mainStyle = {
    flexGrow: 1,
    padding: '40px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    textAlign: 'left',
  };

  return (
    <div style={containerStyle}>
      <aside style={sidebarStyle}>
        <div>
          <NavLink to="/" style={brandStyle}>
            <span style={{ color: 'var(--accent)' }}>✈</span> Wanderlust
          </NavLink>
          <div style={{ fontSize: '12px', color: 'var(--text)', marginTop: '4px', opacity: 0.8 }}>
            Partner Portal
          </div>
        </div>

        <nav style={{ flexGrow: 1 }}>
          <ul style={menuStyle}>
            <li>
              <NavLink to="/dashboard" style={linkStyle} className="hover:bg-slate-500/5 hover:text-[var(--text-h)] transition-all duration-200">
                <span>📊</span> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookings" style={linkStyle} className="hover:bg-slate-500/5 hover:text-[var(--text-h)] transition-all duration-200">
                <span>📋</span> Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/" style={linkStyle} className="hover:bg-slate-500/5 hover:text-[var(--text-h)] transition-all duration-200">
                <span>🏠</span> Public Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" style={linkStyle} className="hover:bg-slate-500/5 hover:text-[var(--text-h)] transition-all duration-200">
                <span>🔒</span> Re-Authenticate
              </NavLink>
            </li>
          </ul>
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--text-h)' }}>{user?.name || 'Explorer Account'}</div>
            <div style={{ color: 'var(--text)', fontSize: '12px', wordBreak: 'break-all' }}>{user?.email || 'explorer@wanderlust.com'}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/30 transition-all duration-200 cursor-pointer"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
