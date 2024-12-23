export const rankUtils = (value: "Membership" | "Silver" | "Gold") => {
  let textColor, bgColor;
  switch (value) {
    case "Membership":
      textColor = "text-gray-500";
      bgColor = "bg-gray-100"; // Light gray background
      break;
    case "Silver":
      textColor = "text-gray-700";
      bgColor = "bg-gray-300"; // Silver-like background
      break;
    case "Gold":
      textColor = "text-yellow-600";
      bgColor = "bg-yellow-100"; // Light gold background
      break;
    default:
      textColor = "text-gray-500";
      bgColor = "bg-gray-100"; // Fallback background
  }

  return { textColor, bgColor };
};
