import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar.jsx';

const PublicLayout = () => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--bg)',
    color: 'var(--text)',
  };

  const mainStyle = {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
  };

  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
