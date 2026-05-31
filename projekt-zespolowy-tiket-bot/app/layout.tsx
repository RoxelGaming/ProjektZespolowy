import "./globals.css"; // Ta linijka musi tu być!

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
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}