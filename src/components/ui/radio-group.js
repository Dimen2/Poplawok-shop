import React, { createContext, useContext } from 'react';

const RadioGroupContext = createContext({});

const RadioGroup = React.forwardRef(({ value, onValueChange, children, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} role="radiogroup" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef(({ value, id, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useContext(RadioGroupContext);
  const isSelected = selectedValue === value;

  return (
    <button
      ref={ref}
      id={id}
      role="radio"
      aria-checked={isSelected}
      onClick={() => onValueChange?.(value)}
      className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {isSelected && (
        <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
      )}
    </button>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };