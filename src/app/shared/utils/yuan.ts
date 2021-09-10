/**
 * Transform into an RMB element string
 * @param digits When the digital type, the number of numbers after the decimal point is allowed, the default 2 decimal
 */
export function yuan(value: number | string, digits: number = 2): string {
  if (typeof value === "number") {
    value = value.toFixed(digits);
  }
  return `&yen ${value}`;
}
