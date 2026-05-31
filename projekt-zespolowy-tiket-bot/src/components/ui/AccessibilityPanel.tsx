'use client';

import { useEffect, useRef, useState } from 'react';
import { Accessibility, X } from 'lucide-react';

import { useAccessibility } from '@/providers/AccessibilityProvider';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    letterSpacing,
    setLetterSpacing,
  } = useAccessibility();

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

  const fontSizeOptions = [
    { label: 'A', value: 'sm' as const, preview: 'text-xs' },
    { label: 'A', value: 'base' as const, preview: 'text-sm' },
    { label: 'A+', value: 'lg' as const, preview: 'text-lg' },
    { label: 'A++', value: 'xl' as const, preview: 'text-xl' },
  ];

  const letterSpacingOptions = [
    {
      label: <span className="tracking-normal">T</span>,
      value: 'tracking-normal' as const,
    },
    {
      label: <span className="tracking-wide">T T</span>,
      value: 'tracking-wide' as const,
    },
    {
      label: <span className="tracking-widest">T T</span>,
      value: 'tracking-widest' as const,
    },
  ];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      if (e.key === 'Tab' && isOpen) {
        const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
          'button, input, a, select, textarea'
        );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  return (
    <>
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

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
        aria-labelledby="accessibility-panel-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="accessibility-panel-title" className="text-lg font-semibold">
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

        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400">Text Size</label>

            <div className="flex gap-2">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFontSize(option.value)}
                  className={`
                    px-3 py-2 rounded border transition
                    ${fontSize === option.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-muted border-border'}
                  `}
                >
                  <span className={option.preview}>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-400">High Contrast</label>
              <p className="text-xs text-slate-500">
                Improves readability by forcing strong color contrast.
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
              />
              <span
                className="
                  relative h-6 w-11 rounded-full bg-slate-300 transition
                  after:content-['']
                  after:absolute after:left-1 after:top-1
                  after:h-4 after:w-4 after:rounded-full after:bg-white
                  after:transition
                  peer-checked:bg-primary
                  peer-checked:after:translate-x-5
                "
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400">Letter Spacing</label>

            <div className="flex gap-2">
              {letterSpacingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLetterSpacing(option.value)}
                  className={`
                    px-4 py-2 rounded border transition
                    ${letterSpacing === option.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-muted border-border'}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
