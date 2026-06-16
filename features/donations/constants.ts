export const DONATION_CATEGORIES = [
  "Pendidikan",
  "Kesehatan",
  "Bencana Alam",
  "Kemanusiaan",
] as const;

export type DonationCategory = (typeof DONATION_CATEGORIES)[number];
