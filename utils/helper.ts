export function formatCamelCase(text: string): string {
    // Insert space before capital letters & capitalize first letter
    const spaced = text.replace(/([a-z])([A-Z])/g, "$1 $2");
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }

  export function getStatusColor(status?: string) {
    switch (status) {
      case "Pending":
        return "text-[#e10000]";
      case "In Progress":
        return "text-blue-700";
      case "Completed":
        return "text-[#f5c500]";
      default:
        return "";      // fallback—no extra colour
    }
  }