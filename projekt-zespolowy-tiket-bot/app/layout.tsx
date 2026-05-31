import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from './contexts/ToastContext';

export const metadata = {
  title: "TicketBot Dashboard",
  description: "Projekt Zespołowy",
};

// Ładujemy font (czcionkę) i przypisujemy go do zmiennej
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${inter.className}`}>
      <ToastProvider>
        {children}
      </ToastProvider>
      </body>
    </html>
  );
}