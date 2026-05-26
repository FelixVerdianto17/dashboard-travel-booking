import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';

const BookingCard = ({ booking, onDelete }) => {
  const getDestinationImage = (destination) => {
    if (destination.includes('Tokyo')) {
      return 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=500&q=80';
    }
    if (destination.includes('Paris')) {
      return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80';
    }
    if (destination.includes('Bali')) {
      return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80';
    }
    return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=500&q=80';
  };

  const imageWrapperStyle = {
    height: '200px',
    background: 'var(--border)',
    position: 'relative',
    overflow: 'hidden',
  };

  const contentStyle = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flexGrow: 1,
  };

  const metaGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    fontSize: '14px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '16px',
  };

  const metaItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const metaLabelStyle = {
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--text)',
    opacity: 0.8,
    letterSpacing: '0.5px',
  };

  const metaValueStyle = {
    fontWeight: '500',
    color: 'var(--text-h)',
    textAlign: 'left',
  };

  const footerRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  };

  const priceStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--accent)',
  };

  const deleteButtonStyle = {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const editButtonStyle = {
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Card 
      padding="0px" 
      borderRadius="16px" 
      hoverable={true}
      className="group overflow-hidden shadow-sm"
    >
      <div style={imageWrapperStyle} className="overflow-hidden">
        <img
          src={getDestinationImage(booking.destination)}
          alt={booking.destination}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <Badge status={booking.status} variant="card-overlay" />
      </div>

      <div style={contentStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '19px', fontWeight: '600', color: 'var(--text-h)', margin: 0 }}>
            📍 {booking.destination}
          </h3>
          <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>
            Booking ID: #{booking.id}
          </span>
        </div>

        <div style={metaGridStyle}>
          <div style={metaItemStyle}>
            <span style={metaLabelStyle}>Customer</span>
            <span style={metaValueStyle}>{booking.customerName}</span>
          </div>
          <div style={metaItemStyle}>
            <span style={metaLabelStyle}>Dates</span>
            <span style={metaValueStyle}>{booking.date}</span>
          </div>
          <div style={metaItemStyle}>
            <span style={metaLabelStyle}>Travelers</span>
            <span style={metaValueStyle}>
              👤 {booking.travelers} {booking.travelers === 1 ? 'Guest' : 'Guests'}
            </span>
          </div>
          <div style={metaItemStyle}>
            <span style={metaLabelStyle}>Payment</span>
            <Badge status={booking.paymentStatus} variant="payment" />
          </div>
        </div>

        <div style={footerRowStyle}>
          <span style={priceStyle}>{booking.totalPrice}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {booking.isUserCreated && (
              <>
                <Link
                  to={`/bookings/${booking.id}/edit`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={editButtonStyle}
                  className="hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/35 transition-all duration-200"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(booking.id);
                  }}
                  style={deleteButtonStyle}
                  className="hover:bg-red-500/20 hover:border-red-500/35 transition-all duration-200"
                >
                  🗑️ Delete
                </button>
              </>
            )}
            <Link
              to={`/bookings/${booking.id}`}
              style={{
                fontSize: '14px',
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              className="hover:underline"
            >
              View Details <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
