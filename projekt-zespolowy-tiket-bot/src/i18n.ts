import {getRequestConfig} from 'next-intl/server';
import {headers, cookies} from 'next/headers';

export default getRequestConfig(async () => 
{
  // Spróbuj pobrać język z ciasteczka
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  // Jeśli brak ciasteczka, sprawdź Accept-Language
  const accept = headers().get('accept-language') || '';
  const detected = accept.split(',')[0].split('-')[0]; 
  // Ustal język: cookie > accept > fallback 'en'
  const locale = cookieLocale || (['pl','en'].includes(detected) ? detected : 'en');
  // Załaduj plik z tłumaczeniami
  const messages = (await import(`./transcripts/messages/${locale}.json`)).default;
  return { locale, messages };
});
