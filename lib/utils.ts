export function removeFirstH1(html: string): string {
  const match = html.match(/<h1[^>]*>.*?<\/h1>/i);
  if (!match) return html;
  return html.replace(match[0], '');
}