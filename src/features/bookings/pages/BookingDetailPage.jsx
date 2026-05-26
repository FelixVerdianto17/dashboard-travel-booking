import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookingById } from '../services/bookingService';
import { bookingKeys } from '../queries/bookingKeys';
import Card from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import Alert from '../../../components/common/Alert';
import Skeleton from '../../../components/common/Skeleton';

const BookingDetailPage = () => {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: bookingKeys.detail(bookingId),
    queryFn: () => getBookingById(bookingId),
  });

  const containerStyle = {
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const backLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'opacity 0.2s',
  };

  const detailGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '24px',
  };

  const detailItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--text)',
    letterSpacing: '0.5px',
  };

  const valueStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: 'var(--text-h)',
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div>
          <span style={backLinkStyle}>&larr; Back to Dashboard</span>
        </div>
        <Skeleton type="detail" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div>
          <Link to="/dashboard" style={backLinkStyle}>
            &larr; Back to Dashboard
          </Link>
        </div>
        <Card padding="32px">
          <Alert 
            message={error.message || 'Error Loading Booking'}
            description={`We couldn't find a booking with ID "${bookingId}". Please make sure the URL is correct or select a booking from the dashboard.`}
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div>
        <Link to="/dashboard" style={backLinkStyle}>
          &larr; Back to Dashboard
        </Link>
      </div>

      <Card padding="32px">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-h)', margin: '0 0 4px 0' }}>
              Booking Details
            </h1>
            <span style={{ fontSize: '14px', color: 'var(--text)' }}>Booking ID: #{booking.id}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {booking.isUserCreated && (
              <Link
                to={`/bookings/${booking.id}/edit`}
                style={{
                  fontSize: '14px',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '1px solid var(--accent-border)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                }}
                className="hover:bg-[var(--accent-bg)]"
              >
                ✏️ Edit Booking
              </Link>
            )}
            <Badge status={booking.status} />
          </div>
        </div>

        <div style={detailGridStyle}>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Customer Name</span>
            <span style={valueStyle}>{booking.customerName}</span>
          </div>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Destination</span>
            <span style={valueStyle}>📍 {booking.destination}</span>
          </div>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Travel Dates</span>
            <span style={valueStyle}>📅 {booking.date}</span>
          </div>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Total Price</span>
            <span style={{ ...valueStyle, color: 'var(--accent)', fontWeight: '700', fontSize: '18px' }}>
              {booking.totalPrice}
            </span>
          </div>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Number of Travelers</span>
            <span style={valueStyle}>{booking.travelers} {booking.travelers === 1 ? 'Guest' : 'Guests'}</span>
          </div>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Payment Status</span>
            <Badge status={booking.paymentStatus} variant="standard" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={labelStyle}>Special Notes & Requests</span>
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
              fontSize: '14px',
              lineHeight: '1.6',
              fontStyle: booking.notes ? 'normal' : 'italic',
            }}
          >
            {booking.notes || 'No special requests or notes have been logged for this booking.'}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingDetailPage;
