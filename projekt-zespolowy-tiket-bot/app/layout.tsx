import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from './contexts/ToastContext';
import { SettingsProvider } from './contexts/SettingsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "TicketBot Dashboard",
  description: "Projekt Zespołowy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300 bg-surface-base text-text-main antialiased`}>
        <SettingsProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}