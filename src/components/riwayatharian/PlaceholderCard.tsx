import React from 'react';

export const PlaceholderCard = ({ className = "" }) => {
  return (
    <div className={`bg-gray-200 rounded-2xl ${className}`}></div>
  );
};