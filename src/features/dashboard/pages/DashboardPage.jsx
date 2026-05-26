import { useState, useEffect } from 'react';
import { BookOpen, Plane, CreditCard, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDashboardSummary } from '../services/dashboardService';
import Card from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import Alert from '../../../components/common/Alert';
import Skeleton from '../../../components/common/Skeleton';

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setError(null);
    getDashboardSummary()
      .then((data) => {
        if (isMounted) {
          setSummary(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching dashboard summary:', err);
        if (isMounted) {
          setError('Failed to load dashboard metrics. Please reload the page or try again.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const bookings = [
    { id: 1, destination: 'Tokyo, Japan', date: 'Oct 12 - Oct 20', status: 'Confirmed', price: '$1,200', img: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=300&q=80' },
    { id: 2, destination: 'Paris, France', date: 'Dec 05 - Dec 12', status: 'Pending', price: '$1,850', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80' },
    { id: 3, destination: 'Bali, Indonesia', date: 'Jan 18 - Jan 25', status: 'Confirmed', price: '$950', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80' },
  ];

  const headerStyle = {
    marginBottom: '32px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--text-h)',
    margin: '0 0 6px 0',
  };

  const subtitleStyle = {
    fontSize: '15px',
    color: 'var(--text)',
    margin: 0,
  };

  const gridStatsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  };

  const bookingGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  };

  const imageWrapperStyle = {
    height: '180px',
    background: 'var(--border)',
    position: 'relative',
  };

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Overview & Bookings</h1>
        <p style={subtitleStyle}>Welcome back, Explorer! Manage your upcoming journeys.</p>
      </header>

      <section style={gridStatsStyle}>
        {error ? (
          <div className="col-span-full">
            <Alert 
              message="Failed to load dashboard metrics"
              description={error}
            />
          </div>
        ) : isLoading ? (
          <Skeleton type="stats" count={4} />
        ) : (
          <>
            <Card padding="24px" borderRadius="12px" className="shadow-sm">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text)', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BookOpen className="h-4 w-4" /> Total Bookings</span>
                <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-h)', marginTop: '4px' }}>{summary?.totalBookings}</span>
                <span style={{ fontSize: '12px', color: 'var(--text)', opacity: 0.8 }}>Registered trips cataloged</span>
              </div>
            </Card>
            <Card padding="24px" borderRadius="12px" className="shadow-sm">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text)', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Plane className="h-4 w-4" /> Active Trips</span>
                <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent)', marginTop: '4px' }}>{summary?.activeTrips}</span>
                <span style={{ fontSize: '12px', color: 'var(--text)', opacity: 0.8 }}>Trips currently in progress</span>
              </div>
            </Card>
            <Card padding="24px" borderRadius="12px" className="shadow-sm">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text)', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CreditCard className="h-4 w-4" /> Pending Payments</span>
                <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-h)', marginTop: '4px' }}>{summary?.pendingPayments}</span>
                <span style={{ fontSize: '12px', color: 'var(--text)', opacity: 0.8 }}>Requires billing resolution</span>
              </div>
            </Card>
            <Card padding="24px" borderRadius="12px" className="shadow-sm">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text)', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 className="h-4 w-4" /> Completed Trips</span>
                <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-h)', marginTop: '4px' }}>{summary?.completedTrips}</span>
                <span style={{ fontSize: '12px', color: 'var(--text)', opacity: 0.8 }}>Past client journeys completed</span>
              </div>
            </Card>
          </>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-h)', marginBottom: '20px' }}>Upcoming Bookings</h2>
        <div style={bookingGridStyle}>
          {bookings.map((booking) => (
            <Card 
              key={booking.id} 
              padding="0px" 
              borderRadius="12px"
              hoverable={true}
              className="group"
            >
              <div style={imageWrapperStyle} className="overflow-hidden">
                <img
                  src={booking.img}
                  alt={booking.destination}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <Badge status={booking.status} variant="card-overlay" />
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-h)', margin: '0 0 4px 0' }}>{booking.destination}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text)', margin: 0 }}>{booking.date}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '4px' }}>
                  <Link to={`/bookings/${booking.id}`} style={{ fontSize: '14px', color: 'var(--accent)', textDecoration: 'none', fontWeight: '600' }}>
                    View Details &rarr;
                  </Link>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-h)' }}>{booking.price}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
