export function formatCamelCase(text: string): string {
    // Insert space before capital letters & capitalize first letter
    const spaced = text.replace(/([a-z])([A-Z])/g, "$1 $2");
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }