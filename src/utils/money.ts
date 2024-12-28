export const formatMoney = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
    minimumFractionDigits: 0, // Ensure no decimal places are shown
  }).format(amount);

  // Move the currency code to the end
  return formattedAmount.replace("VND", "").trim() + " VND";
};
