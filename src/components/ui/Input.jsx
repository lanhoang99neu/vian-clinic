import React, { forwardRef } from 'react';

export const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  id,
  ...props 
}, ref) => {
  const inputId = id || Math.random().toString(36).substring(7);
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="font-sans font-semibold text-sm tracking-wide text-on-surface-variant"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          bg-transparent px-4 py-3 font-sans text-on-surface 
          border border-outline-variant rounded
          transition-colors duration-300 ease-in-out
          focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
          placeholder:text-on-surface-variant/50
          ${error ? 'border-error focus:border-error focus:ring-error' : ''}
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-error font-sans">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
