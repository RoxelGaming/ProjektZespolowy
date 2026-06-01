import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from './contexts/ToastContext';
import { SettingsProvider } from './contexts/SettingsContext'; // Dodany import naszego nowego kontekstu

// Ładujemy font (czcionkę) i przypisujemy go do zmiennej
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
    // suppressHydrationWarning jest kluczowe! 
    // Zapobiega błędom Next.js, gdy SettingsContext zmienia atrybuty <html> na żywo
    <html suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300 bg-white text-gray-900 dark:bg-[#101216] dark:text-[#f2f3f5] antialiased`}>
        {/* SettingsProvider musi być najwyżej, aby kontrolować motyw dla całej reszty */}
        <SettingsProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}