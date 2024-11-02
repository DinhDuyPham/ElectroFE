export function convertCurrency(price) {
  if (!price || isNaN(price) || typeof price !== "number") return;

  return price.toLocaleString("vi", { style: "currency", currency: "VND" });
}
