export function preprocessDiscord(content: string) {
  let text = content;

  text = text.replace(
    /<@(\d+)>/g,
    (_, id) => `@User-${id.slice(-4)}`
  );

  text = text.replace(
    /<#(\d+)>/g,
    (_, id) => `#channel-${id.slice(-4)}`
  );

  text = text.replace(
    /<@&(\d+)>/g,
    (_, id) => `@Role-${id.slice(-4)}`
  );

  return text;
}
