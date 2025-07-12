import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  // Function để convert markdown thành HTML đơn giản
  const renderMarkdown = (markdown: string): string => {
    let html = markdown;

    // Escape HTML characters trước
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headers (theo thứ tự từ lớn đến nhỏ để tránh conflict)
    html = html.replace(
      /^#### (.*$)/gim,
      '<h4 class="text-base font-semibold text-gray-800 mt-3 mb-2">$1</h4>'
    );
    html = html.replace(
      /^### (.*$)/gim,
      '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">$1</h3>'
    );
    html = html.replace(
      /^## (.*$)/gim,
      '<h2 class="text-xl font-semibold text-gray-800 mt-5 mb-3">$1</h2>'
    );
    html = html.replace(
      /^# (.*$)/gim,
      '<h1 class="text-2xl font-bold text-gray-900 mt-6 mb-4">$1</h1>'
    );

    // Strikethrough
    html = html.replace(
      /~~(.*?)~~/g,
      '<del class="line-through text-gray-500">$1</del>'
    );

    // Bold và Italic (theo thứ tự để tránh conflict)
    html = html.replace(
      /\*\*\*(.*?)\*\*\*/g,
      '<strong class="font-bold italic text-gray-900">$1</strong>'
    );
    html = html.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-gray-900">$1</strong>'
    );
    html = html.replace(
      /\*(.*?)\*/g,
      '<em class="italic text-gray-700">$1</em>'
    );

    // Code blocks trước code inline
    html = html.replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 border"><code class="text-sm font-mono text-gray-800">$1</code></pre>'
    );

    // Code inline
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600 border">$1</code>'
    );

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Blockquotes (hỗ trợ multi-line)
    html = html.replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic rounded-r">$1</blockquote>'
    );

    // Lists với styling tốt hơn
    html = html.replace(
      /^- (.*$)/gim,
      '<li class="ml-6 mb-1 relative"><span class="absolute -ml-4 text-blue-600">•</span>$1</li>'
    );
    html = html.replace(
      /^(\d+)\. (.*$)/gim,
      '<li class="ml-6 mb-1 relative list-decimal list-inside">$2</li>'
    );

    // Line breaks và paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">');
    html = html.replace(/\n/g, '<br class="my-1">');

    // Wrap in paragraph if needed
    if (!html.startsWith("<")) {
      html = '<p class="mb-4 leading-relaxed">' + html + "</p>";
    }

    // Tables (improved support)
    const tableRegex = /\|(.+)\|\n\|[\s-|]+\|\n((?:\|.+\|\n?)*)/g;
    html = html.replace(tableRegex, (_, header, rows) => {
      const headerCells = header
        .split("|")
        .map((cell: string) => cell.trim())
        .filter((cell: string) => cell);
      const headerHtml = headerCells
        .map(
          (cell: string) =>
            `<th class="border border-gray-300 px-3 py-2 bg-gray-100 font-semibold text-left text-sm">${cell}</th>`
        )
        .join("");

      const rowsHtml = rows
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .map((cell: string) => cell.trim())
            .filter((cell: string) => cell);
          const cellsHtml = cells
            .map(
              (cell: string) =>
                `<td class="border border-gray-300 px-3 py-2 text-sm">${cell}</td>`
            )
            .join("");
          return `<tr class="hover:bg-gray-50">${cellsHtml}</tr>`;
        })
        .join("");

      return `<div class="overflow-x-auto my-4">
        <table class="border-collapse border border-gray-300 w-full text-sm">
          <thead class="bg-gray-50"><tr>${headerHtml}</tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>`;
    });

    // Thêm support cho underline
    html = html.replace(/<u>(.*?)<\/u>/g, '<span class="underline">$1</span>');

    // Clean up extra spaces
    html = html.replace(/\s+/g, " ").trim();

    return html;
  };

  return (
    <div
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{
        __html: renderMarkdown(content),
      }}
    />
  );
};

export default MarkdownRenderer;
