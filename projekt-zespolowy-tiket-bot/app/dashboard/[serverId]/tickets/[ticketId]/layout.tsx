// Ten plik to komponent serwerowy (nie ma 'use client' na górze),
// więc generateStaticParams zadziała tutaj idealnie!

export function generateStaticParams() {
  return [
    { ticketId: '1024' },
    { ticketId: '1025' },
    { ticketId: '1026' },
    { ticketId: '0998' },
    { ticketId: '0999' }
  ];
}

export default function TicketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}