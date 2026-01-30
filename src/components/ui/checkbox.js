import React from 'react';

const Checkbox = React.forwardRef(({ 
  checked, 
  onCheckedChange, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={`h-5 w-5 rounded border border-gray-300 flex items-center justify-center ${
        checked ? 'bg-blue-600 border-blue-600' : 'bg-white'
      } ${className}`}
      {...props}
    >
      {checked && (
        <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };