'use client'

import React, { createContext, useContext, useState } from 'react';

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface ToastContextType {
    addToast: (message: string, type: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {

    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: Toast['type']) => {
        const newToast: Toast = {
            id: Date.now().toString(),
            message,
            type
        };

        setToasts((currentToasts) => {
            const updatedToasts = [...currentToasts, newToast];
            return updatedToasts.slice(-5);
        });

        setTimeout(() => {
            removeToast(newToast.id);
        }, 5000);
    };

    const removeToast = (id: string) => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }
    
    const getToastColors = (type: Toast['type']) => {
        switch (type) {
            case 'success':
                return 'bg-gray-950 text-green-700 border border-gray-800';
            case 'error':
                return 'bg-red-500 text-red-100';
            case 'info':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    }

    const getPositionClasses = (position: ToastPosition) => {
        switch (position) {
            case 'top-right':
                return 'top-[var(--header-height)] right-4';
            case 'top-left':
                return 'left-4 top-[var(--header-height)]';
            case 'bottom-right':
                return 'right-4 bottom-4';
            case 'bottom-left':
                return 'left-4 bottom-4';
            default:
                return 'top-[var(--header-height)] right-4';
        }
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => ( 
                    <div key={toast.id} 
                         className={`max-w-xs max-h-xs p-4 rounded-md shadow-lg mb-2 transition-all ${getToastColors(toast.type)}`}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast musi być użyte wewnątrz ToastProvider');
    }
    return context;
}