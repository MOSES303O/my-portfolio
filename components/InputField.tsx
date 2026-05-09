'use client';

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  field: string;
  label: string;
  icon: LucideIcon;
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField = ({
  field,
  label,
  icon: Icon,
  formData,
  handleChange,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputClasses = (isTextArea = false) => {
    const baseClasses = `
      w-full p-4 rounded-xl bg-white/10 text-white placeholder-transparent 
      focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 
      focus:ring-offset-[#1c1e26] transition-all duration-300 peer
    `;

    const hoverFocusClasses = isFocused
      ? "shadow-[0_4px_12px_rgba(99,102,241,0.4)] border-[#6366f1]"
      : "border-white/20 hover:border-[#6366f1]";

    return `${baseClasses} ${hoverFocusClasses} ${isTextArea ? "h-52 pt-12" : "pl-12"}`;
  };

  const isMessageField = field === "message";

  return (
    <div className="relative w-full group">
      {/* Icon + Floating Label */}
      <div className="absolute left-4 top-4 flex items-center space-x-2 text-gray-400 transition-colors group-hover:text-[#6366f1] z-10">
        <Icon className="w-5 h-5" />
      </div>

      <label
        htmlFor={field}
        className={`
          absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm transition-all duration-300 pointer-events-none z-10
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
          peer-focus:top-2 peer-focus:-translate-y-1/2 peer-focus:text-[#6366f1] peer-focus:text-sm
        `}
      >
        {label}
      </label>

      {/* Input / Textarea */}
      {isMessageField ? (
        <textarea
          id={field}
          name={field}
          placeholder={label}
          value={formData[field] || ''}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getInputClasses(true)}
          required
        />
      ) : (
        <input
          id={field}
          type={field === "email" ? "email" : "text"}
          name={field}
          placeholder={label}
          value={formData[field] || ''}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getInputClasses(false)}
          required
        />
      )}

      {/* Animated Border Effect */}
      <div
        className={`absolute inset-0 border rounded-xl pointer-events-none transition-all duration-300 ${
          isFocused ? "border-[#6366f1]" : "border-transparent"
        }`}
      />
    </div>
  );
};

export default InputField;