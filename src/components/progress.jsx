import React from 'react';

// Old progress bar from the first version of the form. Not used anywhere now
// (the form draws its own bars in Registration.jsx), so it can be deleted.
export default function Progress({ value = 0, max = 100 }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className='w-[60px] sm:w-[120px] '>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>{Math.round(percentage)}%</span>
      </div> */}

      {/* Progress Track */}
      <div style={{
        height: '5px',
        width: '100%',
        backgroundColor: '#ffffff3c',
        overflow: 'hidden'
      }}>
        {/* Progress Fill */}
        <div style={{
          height: '10px',
          width: `${percentage}%`,
          backgroundColor: '#ffffff',
          borderRadius: 'inherit',
          transition: 'width 0.3s ease-in-out' // Smooth animation when value changes
        }} />
      </div>
    </div>
  );
}
