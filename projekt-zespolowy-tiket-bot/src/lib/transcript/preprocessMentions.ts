export function preprocessMentions(content: string) {
  return content.replace(
    /<@(\d+)>/g,
    (_, id) => `@User-${id.slice(-4)}`
  );
}
