import React from 'react';

const Badge = ({ status, label, variant = 'standard', style = {}, className = '' }) => {
  const isConfirmedOrPaid = status === 'Confirmed' || status === 'Paid';
  
  let computedStyle = {};

  if (variant === 'card-overlay') {
    computedStyle = {
      position: 'absolute',
      top: '12px',
      right: '12px',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      background: isConfirmedOrPaid ? 'rgba(16, 185, 129, 0.9)' : 'rgba(245, 158, 11, 0.9)',
      color: '#fff',
      backdropFilter: 'blur(4px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: 'none',
    };
  } else if (variant === 'payment') {
    computedStyle = {
      display: 'inline-block',
      padding: '3px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      width: 'fit-content',
      background: isConfirmedOrPaid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
      color: isConfirmedOrPaid ? '#10b981' : '#f59e0b',
      border: isConfirmedOrPaid ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)',
    };
  } else { // 'standard'
    computedStyle = {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      width: 'fit-content',
      background: isConfirmedOrPaid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
      color: isConfirmedOrPaid ? '#10b981' : '#f59e0b',
      border: isConfirmedOrPaid ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
    };
  }

  return (
    <span style={{ ...computedStyle, ...style }} className={className}>
      {label || status}
    </span>
  );
};

export default Badge;
