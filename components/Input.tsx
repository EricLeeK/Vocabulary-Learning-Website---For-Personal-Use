import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-bold text-gray-700 ml-1">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-xl border-4 border-black focus:outline-none focus:ring-4 focus:ring-toon-pink/50 text-lg ${className}`}
        {...props}
      />
    </div>
  );
};