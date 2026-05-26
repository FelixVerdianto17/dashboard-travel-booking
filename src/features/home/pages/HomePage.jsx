import { Link } from 'react-router-dom';

const HomePage = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: '40px 20px',
    textAlign: 'center',
  };

  const cardStyle = {
    maxWidth: '500px',
    width: '100%',
    padding: '48px 40px',
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
    fontSize: '36px',
    fontWeight: '700',
    color: 'var(--text-h)',
    margin: 0,
    letterSpacing: '-1px',
    lineHeight: '1.2',
  };

  const textStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--text)',
    margin: 0,
  };

  const btnPrimaryStyle = {
    display: 'block',
    padding: '14px 28px',
    borderRadius: '8px',
    background: 'var(--accent)',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'opacity 0.2s',
    border: 'none',
    cursor: 'pointer',
  };

  const btnSecondaryStyle = {
    display: 'block',
    padding: '14px 28px',
    borderRadius: '8px',
    background: 'transparent',
    color: 'var(--text-h)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    border: '1px solid var(--border)',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="flex flex-col items-center gap-4">

          <h1 style={titleStyle}>Elegance in Every Journey</h1>
          <p style={textStyle}>
            Explore our handcrafted itineraries, boutique accommodations, and seamless travel booking experiences worldwide.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/login" style={btnPrimaryStyle}>
            Start Planning
          </Link>
          <Link to="/dashboard" style={btnSecondaryStyle}>
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
