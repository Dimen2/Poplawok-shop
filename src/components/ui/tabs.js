import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext({});

const Tabs = React.forwardRef(({ defaultValue, className = '', children, ...props }, ref) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}
      {...props}
    />
  );
});

TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef(({ value, className = '', ...props }, ref) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      onClick={() => setActiveTab(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none ${
        isActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
      } ${className}`}
      {...props}
    />
  );
});

TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef(({ value, className = '', ...props }, ref) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div
      ref={ref}
      className={`mt-2 ${className}`}
      {...props}
    />
  );
});

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };