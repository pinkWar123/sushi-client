export const rankUtils = (value: "Membership" | "Silver" | "Gold") => {
  let textColor, bgColor;
  switch (value) {
    case "Membership":
      textColor = "text-green-600"; // Slightly darker green for text
      bgColor = "bg-green-100"; // Light green background
      break;
    case "Silver":
      textColor = "text-gray-700"; // Darker gray text
      bgColor = "bg-gray-300"; // Silver-like background
      break;
    case "Gold":
      textColor = "text-yellow-600"; // Gold-like text
      bgColor = "bg-yellow-100"; // Light gold background
      break;
    default:
      textColor = "text-red-500"; // Fallback text
      bgColor = "bg-red-100"; // Fallback background
  }

  return { textColor, bgColor };
};
