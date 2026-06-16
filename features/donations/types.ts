export interface Donation {
  id: string;

  user_id: string;

  amount: number;

  category: string;

  note: string;

  latitude?: number | null;

  longitude?: number | null;

  photo_url?: string | null;

  created_at: string;
}

export interface CreateDonationPayload {
  amount: number;

  category: string;

  note: string;

  latitude?: number;

  longitude?: number;

  photo_url?: string;

  imageUri?: string;
}
