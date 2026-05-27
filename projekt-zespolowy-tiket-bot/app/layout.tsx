import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from './contexts/ToastContext';

// Ładujemy font (czcionkę) i przypisujemy go do zmiennej
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${inter.className} bg-black/90 text-white/90`}>
      <ToastProvider>
        {children}
      </ToastProvider>
      </body>
    </html>
  );
}