import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-300`}
        style={{ 
          borderTopColor: '#e94057',
          boxShadow: '0 0 10px rgba(233, 64, 87, 0.2)'
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
