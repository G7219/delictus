export function formatTzsRange(min: number, max: number): string {
  return `${min.toLocaleString("en-US")}\u2013${max.toLocaleString("en-US")} TZS`;
}
