import React from 'react';

const Alert = ({ 
  message, 
  description, 
  type = 'error', 
  onRetry, 
  style = {}, 
  className = '' 
}) => {
  const isError = type === 'error';
  
  const containerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px 20px',
    borderRadius: '12px',
    textAlign: 'left',
    fontSize: '14px',
    background: isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
    border: isError ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)',
    color: isError ? '#f87171' : '#fbbf24',
    width: '100%',
    boxSizing: 'border-box',
    ...style,
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flexGrow: 1,
  };

  const messageStyle = {
    fontWeight: '700',
    fontSize: '15px',
    color: isError ? '#ef4444' : '#f59e0b',
  };

  const descriptionStyle = {
    fontSize: '13px',
    opacity: 0.9,
    lineHeight: '1.5',
    color: 'inherit',
  };

  return (
    <div style={containerStyle} className={className}>
      <span className="text-xl mt-0.5" aria-hidden="true">
        {isError ? '⚠️' : '🔔'}
      </span>
      <div style={textContainerStyle}>
        {message && <span style={messageStyle}>{message}</span>}
        {description && <span style={descriptionStyle}>{description}</span>}
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="mt-2 w-fit px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-lg font-semibold text-red-500 dark:text-red-400 transition-all cursor-pointer text-xs"
          >
            🔄 Retry Request
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
