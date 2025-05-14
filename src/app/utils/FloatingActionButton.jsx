import React from 'react';

export const FloatingActionButton = ({
  icon,
  onClick,
  backgroundColor,
  iconColor,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-2 right-14 rounded-full p-2 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${className} animate-bounce`}
      style={{ backgroundColor }}
    >
      <span className={`flex items-center justify-center text-lg ${iconColor}`}>
        {icon}
      </span>
    </button>
  );
};
