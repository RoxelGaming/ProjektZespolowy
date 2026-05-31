//mozna dodac do global.d.txt
import messages from './messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}