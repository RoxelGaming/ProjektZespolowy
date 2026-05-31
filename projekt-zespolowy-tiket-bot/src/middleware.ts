import createMiddleware from 'next-intl/middleware';

export default createMiddleware
({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localePrefix: 'never',    // brak prefiksów w URL
  localeDetection: true     // używaj cookie Accept-Language
});

export const config = 
{
  matcher: 
  [
    '/',                    // główna strona
    '/((?!api|_next|_vercel|.*\\..*).*)'  // wszystkie inne, z wyjątkiem /api, /_next, /_vercel i plików statycznych
  ]
};
