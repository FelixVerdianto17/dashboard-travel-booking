import React from 'react';
import Card from './Card';

const Skeleton = ({ type = 'card', count = 1 }) => {
  const renderStatsSkeleton = () => (
    <>
      {[...Array(count)].map((_, i) => (
        <Card key={i} padding="24px" borderRadius="12px" className="animate-pulse">
          <div style={{ height: '14px', width: '60%', background: 'var(--border)', borderRadius: '4px' }}></div>
          <div style={{ height: '32px', width: '40%', background: 'var(--border)', borderRadius: '6px', marginTop: '4px' }}></div>
        </Card>
      ))}
    </>
  );

  const renderCardSkeleton = () => (
    <>
      {[...Array(count)].map((_, i) => (
        <Card key={i} padding="0px" borderRadius="16px" className="animate-pulse">
          <div style={{ height: '200px', background: 'var(--border)' }}></div>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ height: '22px', width: '70%', background: 'var(--border)', borderRadius: '4px' }}></div>
            <div style={{ height: '16px', width: '40%', background: 'var(--border)', borderRadius: '4px' }}></div>
            <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[...Array(4)].map((_, idx) => (
                <div key={idx}>
                  <div style={{ height: '10px', width: '40%', background: 'var(--border)', borderRadius: '2px', marginBottom: '4px' }}></div>
                  <div style={{ height: '14px', width: '80%', background: 'var(--border)', borderRadius: '3px' }}></div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div style={{ height: '24px', width: '80px', background: 'var(--border)', borderRadius: '4px' }}></div>
              <div style={{ height: '22px', width: '70px', background: 'var(--border)', borderRadius: '4px' }}></div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );

  const renderDetailSkeleton = () => (
    <Card padding="32px" borderRadius="16px" className="animate-pulse" style={{ gap: '24px' }}>
      <div style={{ height: '28px', width: '40%', background: 'var(--border)', borderRadius: '6px' }}></div>
      <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ height: '12px', width: '30%', background: 'var(--border)', borderRadius: '4px' }}></div>
            <div style={{ height: '18px', width: '70%', background: 'var(--border)', borderRadius: '4px' }}></div>
          </div>
        ))}
      </div>
    </Card>
  );

  if (type === 'stats') return renderStatsSkeleton();
  if (type === 'detail') return renderDetailSkeleton();
  return renderCardSkeleton();
};

export default Skeleton;
