import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border-4 border-black font-bold text-lg transition-all active:translate-y-1 active:shadow-none shadow-comic";
  
  const variants = {
    primary: "bg-toon-blue hover:bg-blue-300 text-black",
    secondary: "bg-white hover:bg-gray-100 text-black",
    danger: "bg-red-400 hover:bg-red-500 text-white",
    success: "bg-toon-green hover:bg-green-400 text-black",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};