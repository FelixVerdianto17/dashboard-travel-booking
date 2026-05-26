import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg)',
    boxSizing: 'border-box',
    width: '100%',
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--text-h)',
    textDecoration: 'none',
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const menuStyle = {
    display: 'flex',
    gap: '24px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--accent)' : 'var(--text)',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: isActive ? '600' : '500',
    transition: 'color 0.2s',
  });

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={logoStyle}>
        <span style={{ color: 'var(--accent)' }}>✈</span> Wanderlust
      </NavLink>
      <ul style={menuStyle}>
        <li>
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" style={linkStyle}>
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
