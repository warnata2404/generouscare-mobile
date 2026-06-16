export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1)} M`;
  }

  if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1)} Jt`;
  }

  if (amount >= 1000) {
    return `Rp ${(amount / 1000).toFixed(1)} Rb`;
  }

  return `Rp ${amount}`;
}
