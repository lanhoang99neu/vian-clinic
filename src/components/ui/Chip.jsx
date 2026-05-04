import React from 'react';

export const Chip = ({ 
  children, 
  className = '', 
  active = false,
  onClick,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium text-sm rounded-full px-4 py-1.5 border transition-colors";
  
  // Apply different styles based on active state
  const stateStyles = active 
    ? "bg-primary text-on-primary border-primary"
    : "bg-transparent text-on-surface-variant border-outline-variant hover:border-primary/50 hover:text-primary";
    
  const interactiveStyles = onClick ? "cursor-pointer" : "";

  return (
    <span 
      className={`${baseStyles} ${stateStyles} ${interactiveStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};
