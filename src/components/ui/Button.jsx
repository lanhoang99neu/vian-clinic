import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  to,
  href,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans font-semibold tracking-wide rounded transition-all duration-300 ease-in-out px-6 py-3 cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:brightness-110 shadow-sm",
    secondary: "bg-transparent border border-primary text-primary hover:bg-primary/5",
    tertiary: "bg-transparent text-primary hover:bg-primary/5",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};
