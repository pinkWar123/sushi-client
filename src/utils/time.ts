export const formattedDate = (date: string) => {
  const dateTime = new Date(date);
  return dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }); // Example: "Wed, July 12, 2023"
};

export const formattedTime = (date: string) => {
  const dateTime = new Date(date);
  return dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
