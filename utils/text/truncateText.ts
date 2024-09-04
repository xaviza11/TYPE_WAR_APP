export function TRUNCATE_TEXT(text: string): string {
    const maxLength = 2000;
  
    if (text.length <= maxLength) {
      return text;
    }
  
    const lastIndex = text.lastIndexOf('.', maxLength);
  
    if (lastIndex === -1) {
      return text.substring(0, maxLength);
    }

    return text.substring(0, lastIndex + 1);
  }
  