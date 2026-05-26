import React from 'react';

const Card = ({ 
  children, 
  hoverable = false, 
  padding = '24px', 
  borderRadius = '16px', 
  style = {}, 
  className = '',
  onClick
}) => {
  const baseStyle = {
    borderRadius,
    border: '1px solid var(--border)',
    background: 'var(--social-bg)',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
    padding,
    boxSizing: 'border-box',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ...style,
  };

  const combinedClassName = `${className} ${hoverable ? 'hover:-translate-y-1 hover:shadow-lg transition-all duration-300' : ''}`.trim();

  return (
    <div 
      style={baseStyle} 
      className={combinedClassName}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
