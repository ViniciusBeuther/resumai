// utils/markdownCopy.ts

/**
 * Converts Markdown to HTML with basic formatting
 * @param markdown - The markdown string to convert
 * @returns HTML string
 */
export const convertMarkdownToHtml = (markdown: string): string => {
  let html = markdown;
  
  // Headers (must go from h6 to h1 to avoid conflicts)
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  
  // Code blocks
  html = html.replace(/```(.*?)```/gims, '<pre><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`(.*?)`/gim, '<code>$1</code>');
  
  // Lists - bullet points
  const lines = html.split('\n');
  let inList = false;
  const processedLines: string[] = [];
  
  lines.forEach((line) => {
    const bulletMatch = line.match(/^[\-\*]\s+(.*)/);
    
    if (bulletMatch) {
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      processedLines.push(`<li>${bulletMatch[1]}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(line);
    }
  });
  
  if (inList) {
    processedLines.push('</ul>');
  }
  
  html = processedLines.join('\n');
  
  // Numbered lists
  const numberedLines = html.split('\n');
  let inNumberedList = false;
  const processedNumberedLines: string[] = [];
  
  numberedLines.forEach((line) => {
    const numberedMatch = line.match(/^\d+\.\s+(.*)/);
    
    if (numberedMatch) {
      if (!inNumberedList) {
        processedNumberedLines.push('<ol>');
        inNumberedList = true;
      }
      processedNumberedLines.push(`<li>${numberedMatch[1]}</li>`);
    } else {
      if (inNumberedList) {
        processedNumberedLines.push('</ol>');
        inNumberedList = false;
      }
      processedNumberedLines.push(line);
    }
  });
  
  if (inNumberedList) {
    processedNumberedLines.push('</ol>');
  }
  
  html = processedNumberedLines.join('\n');
  
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';
  
  // Clean up paragraphs around block elements
  html = html.replace(/<p>(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ol>)/g, '$1');
  html = html.replace(/(<\/ol>)<\/p>/g, '$1');
  html = html.replace(/<p>(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)<\/p>/g, '$1');
  
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  return html;
};

/**
 * Copies markdown content as rich text (HTML) to clipboard
 * Works great for pasting into Google Docs, Word, etc.
 * @param markdown - The markdown string to copy
 * @returns Promise that resolves when copy is complete
 */
export const copyMarkdownAsRichText = async (markdown: string): Promise<void> => {
  // Check if clipboard API is available
  if (!navigator.clipboard) {
    console.error('Clipboard API not available');
    throw new Error('Clipboard API not supported in this browser');
  }

  try {
    const html = convertMarkdownToHtml(markdown);
    
    console.log('📋 Attempting to copy markdown...');
    console.log('Original markdown:', markdown.substring(0, 100) + '...');
    console.log('Converted HTML:', html.substring(0, 100) + '...');
    
    // Check if ClipboardItem is supported
    if (typeof ClipboardItem !== 'undefined') {
      // Modern approach with ClipboardItem
      const htmlBlob = new Blob([html], { type: 'text/html' });
      const plainBlob = new Blob([markdown], { type: 'text/plain' });
      
      const clipboardItem = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': plainBlob
      });
      
      await navigator.clipboard.write([clipboardItem]);
      console.log('✅ Copied using ClipboardItem API');
    } else {
      // Fallback: try using document.execCommand with a hidden element
      console.log('⚠️ ClipboardItem not supported, using fallback method');
      await copyUsingExecCommand(html, markdown);
    }
    
    console.log('✅ Markdown copied as rich text successfully!');
  } catch (error) {
    console.error('❌ Failed to copy as rich text:', error);
    
    // Final fallback to plain text copy
    try {
      await navigator.clipboard.writeText(markdown);
      console.log('⚠️ Copied as plain text (fallback)');
    } catch (fallbackError) {
      console.error('❌ All copy methods failed:', fallbackError);
      throw new Error('Failed to copy to clipboard');
    }
  }
};

/**
 * Legacy fallback method using execCommand
 * @param html - HTML content to copy
 * @param plainText - Plain text fallback
 */
const copyUsingExecCommand = async (html: string, plainText: string): Promise<void> => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-999999px';
  container.style.top = '-999999px';
  container.innerHTML = html;
  
  document.body.appendChild(container);
  
  try {
    const range = document.createRange();
    range.selectNodeContents(container);
    
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      
      const success = document.execCommand('copy');
      
      if (!success) {
        throw new Error('execCommand copy failed');
      }
      
      selection.removeAllRanges();
    }
  } finally {
    document.body.removeChild(container);
  }
};

/**
 * Copies plain markdown text to clipboard
 * @param markdown - The markdown string to copy
 * @returns Promise that resolves when copy is complete
 */
export const copyMarkdownAsPlainText = async (markdown: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(markdown);
    console.log('✅ Markdown copied as plain text successfully!');
  } catch (error) {
    console.error('❌ Failed to copy markdown:', error);
    throw new Error('Failed to copy to clipboard');
  }
};

/**
 * Type definitions for copy result
 */
export interface CopyResult {
  success: boolean;
  message: string;
  error?: Error;
}

/**
 * Enhanced copy function with result feedback
 * @param markdown - The markdown string to copy
 * @param asRichText - Whether to copy as rich text (default: true)
 * @returns Promise with copy result
 */
export const copyMarkdown = async (
  markdown: string, 
  asRichText: boolean = true
): Promise<CopyResult> => {
  try {
    if (asRichText) {
      await copyMarkdownAsRichText(markdown);
    } else {
      await copyMarkdownAsPlainText(markdown);
    }
    
    return {
      success: true,
      message: asRichText 
        ? 'Copied as rich text! Paste into Google Docs.' 
        : 'Copied as plain text!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to copy to clipboard',
      error: error as Error
    };
  }
};