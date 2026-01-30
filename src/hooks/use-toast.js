import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = Date.now();
    const newToast = { id, title, description, variant };
    
    setToasts(prev => [...prev, newToast]);
    
    // Автоматичне видалення через 5 секунд
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
    
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    toast,
    dismiss,
    toasts
  };
}

// Компонент для відображення сповіщень
export const ToastProvider = ({ children }) => {
  const { toasts, dismiss } = useToast();
  
  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg max-w-sm ${
              toast.variant === 'destructive'
                ? 'bg-red-100 text-red-900 border border-red-200'
                : 'bg-white text-gray-900 border border-gray-200'
            }`}
          >
            <div className="font-medium">{toast.title}</div>
            {toast.description && (
              <div className="text-sm mt-1">{toast.description}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export const toast = ({ title, description, variant = 'default' }) => {
  // Це буде використовуватися глобально через контекст
  console.log('Toast:', { title, description, variant });
};