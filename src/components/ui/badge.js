import React from 'react';

const Badge = React.forwardRef(({ 
  variant = 'default', 
  className = '', 
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-gray-100 text-gray-900',
    secondary: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800'
  };

  return (
    <span
      ref={ref}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge };