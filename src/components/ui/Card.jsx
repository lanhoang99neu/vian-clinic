import React from 'react';

export const Card = ({ 
  imageSrc, 
  title, 
  description, 
  className = '', 
  children 
}) => {
  return (
    <div className={`
      group bg-surface-container-lowest rounded overflow-hidden
      transition-all duration-300 ease-in-out
      hover:-translate-y-1 
      ${className}
    `}
    style={{
      boxShadow: '0 10px 30px -5px rgba(111, 0, 14, 0.06)',
    }}>
      {imageSrc && (
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-8">
        <h3 className="font-serif text-2xl font-semibold mb-3 text-on-surface">
          {title}
        </h3>
        {description && (
          <p className="font-sans text-on-surface-variant leading-relaxed mb-6">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};
