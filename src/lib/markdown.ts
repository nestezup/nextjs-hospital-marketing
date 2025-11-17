// Simple markdown to HTML converter for blog content
export function formatMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';

  // Convert markdown headers
  let html = markdown
    // Headers (## Header, ### Header, etc.)
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')

    // Bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

    // Italic text
    .replace(/\*(.+?)\*/g, '<em>$1</em>')

    // Line breaks
    .replace(/\n\n/g, '</p><p>')

    // Lists
    .replace(/^\- (.+)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

    // Blockquotes
    .replace(/^> (.+)$/gim, '<blockquote>$1</blockquote>')

    // Code blocks
    .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')

    // Inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')

    // Links (basic pattern)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  // Wrap in paragraphs
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>';
  }

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>|<ol>|<blockquote>|<pre>)/g, '$1');
  html = html.replace(/(<\/ul>|<\/ol>|<\/blockquote>|<\/pre>)<\/p>/g, '$1');

  return html;
}