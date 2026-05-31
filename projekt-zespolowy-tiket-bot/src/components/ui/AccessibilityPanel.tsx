'use client';

import { useEffect, useRef, useState } from 'react';
import { Accessibility, X } from 'lucide-react';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);

  // ESC key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      // Focus trap (Tab navigation)
      if (e.key === 'Tab' && isOpen) {
        const focusable = drawerRef.current?.querySelectorAll<
          HTMLButtonElement | HTMLInputElement | HTMLAnchorElement
        >('button, input, a');

        if (!focusable || focusable.length === 0) return;

        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        if (!document.activeElement) return;

        // Shift + Tab
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }

        // Tab forward
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Auto focus first element when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed bottom-6 right-6 z-50
          p-3
          bg-primary text-primary-foreground
          rounded-full shadow-xl
          hover:scale-105 transition-transform
        "
        aria-label="Open Accessibility Settings"
      >
        <Accessibility size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`
          fixed top-0 right-0 h-full w-80
          bg-background border-l border-border
          z-[70]
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">
            Accessibility Settings
          </h2>

          <button
            ref={firstFocusableRef}
            onClick={() => setIsOpen(false)}
            className="p-2 rounded hover:bg-muted transition"
            aria-label="Close accessibility panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          {/* placeholder */}
          <p className="text-sm opacity-70">
            Accessibility controls will be added here.
          </p>

          {/* ostatni element focus trap (ukryty helper) */}
          <button
            ref={lastFocusableRef}
            className="opacity-0 h-0 w-0"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      </aside>
    </>
  );
}