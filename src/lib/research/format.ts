/**
 * Australian English (en-AU) formatting helpers.
 * Australian conventions: comma group separators, full stop decimal separator,
 * day-before-month dates.
 */

const numberFormatter = new Intl.NumberFormat("en-AU");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatDecimal(value: number, digits = 1): string {
  return new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** e.g. 23 October 2026 */
export function formatLongDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
