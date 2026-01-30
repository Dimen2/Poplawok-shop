import React, { useState } from 'react';

export const Select = ({ value, onValueChange, children, ...props }) => {
  return (
    <div className="relative" {...props}>
      {children}
    </div>
  );
};

export const SelectTrigger = ({ children, className = '', ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <button
      {...props}
      onClick={() => setOpen(!open)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );
};

export const SelectValue = ({ placeholder = 'Select...', value }) => {
  return (
    <span className="text-gray-900">
      {value || placeholder}
    </span>
  );
};

export const SelectContent = ({ children, open, onOpenChange, className = '' }) => {
  if (!open) return null;

  return (
    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg border border-gray-200 sm:text-sm">
      <div className={className}>
        {children}
      </div>
    </div>
  );
};

export const SelectItem = ({ value, children, onSelect }) => {
  return (
    <div
      onClick={() => onSelect?.(value)}
      className="relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-3 pr-9 text-sm hover:bg-gray-100"
    >
      {children}
    </div>
  );
};