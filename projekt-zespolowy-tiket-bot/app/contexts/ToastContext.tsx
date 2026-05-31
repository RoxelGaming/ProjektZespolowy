'use client'

import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'next/navigation';

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastContextType {
    addToast: (message: string, type: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    
    // Sprawdzamy, czy jesteśmy wewnątrz widoku serwera (czyli czy istnieje Topbar na PC)
    const params = useParams();
    const serverId = params?.serverId as string;

    const addToast = (message: string, type: Toast['type']) => {
        const newToast: Toast = { id: Date.now().toString(), message, type };

        setToasts((currentToasts) => {
            const updatedToasts = [...currentToasts, newToast];
            return updatedToasts.slice(-3); // Max 3 toasty widoczne
        });

        setTimeout(() => removeToast(newToast.id), 5000);
    };

    const removeToast = (id: string) => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }
    
    const getToastColors = (type: Toast['type']) => {
        switch (type) {
            case 'success':
                return 'bg-[#23A559] text-white border border-[#23A559]/50 shadow-[0_5px_20px_rgba(35,165,89,0.2)]'; 
            case 'error':
                return 'bg-[#DA373C] text-white border border-[#DA373C]/50 shadow-[0_5px_20px_rgba(218,55,60,0.2)]';
            case 'warning':
                return 'bg-[#FEE75C] text-black border border-[#FEE75C]/50 shadow-[0_5px_20px_rgba(254,231,92,0.2)]';
            case 'info':
                return 'bg-[#5865F2] text-white border border-[#5865F2]/50 shadow-[0_5px_20px_rgba(88,101,242,0.2)]';
            default:
                return 'bg-[#2b2d31] text-white border border-[#1e222b]';
        }
    }

    // Dynamiczny margines od góry
    const topMarginClass = serverId ? 'top-20 md:top-24' : 'top-20 md:top-8';

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            <div className={`fixed z-[100] right-6 md:right-10 w-[calc(100vw-3rem)] md:w-96 pointer-events-none transition-all duration-300 ${topMarginClass}`}>
                
                <div className="relative w-full">
                    {[...toasts].reverse().map((toast, index) => ( 
                        <div 
                            key={toast.id} 
                            className={`absolute top-0 right-0 w-full p-4 rounded-xl transition-all duration-300 ease-out flex items-start gap-3 pointer-events-auto ${getToastColors(toast.type)}`}
                            style={{
                                transform: `translateY(${index * 16}px) scale(${1 - index * 0.05})`,
                                transformOrigin: 'top center',
                                zIndex: 100 - index,
                                opacity: index === 2 ? 0.4 : index === 1 ? 0.85 : 1,
                            }}
                        >
                            <div className="mt-0.5 shrink-0 text-base">
                                {toast.type === 'success' && <span>✅</span>}
                                {toast.type === 'error' && <span>❌</span>}
                                {toast.type === 'warning' && <span>⚠️</span>}
                                {toast.type === 'info' && <span>ℹ️</span>}
                            </div>
                            
                            <p className="text-sm font-medium leading-relaxed flex-1">
                                {toast.message}
                            </p>

                            <button 
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 p-1.5 -mr-2 -mt-1 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/20 transition-all active:scale-95 cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast musi być użyte wewnątrz ToastProvider');
    return context;
}