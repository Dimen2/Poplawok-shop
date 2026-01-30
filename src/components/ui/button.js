import React from 'react';

const Button = React.forwardRef(({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    ghost: 'bg-transparent hover:bg-gray-100',
    link: 'text-blue-600 underline-offset-4 hover:underline'
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10'
  };

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };