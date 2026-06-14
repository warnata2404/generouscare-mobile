export interface Profile {
  id: string;

  full_name: string;

  email: string;

  avatar_url: string | null;

  created_at: string | null;
}

export interface UpdateProfilePayload {
  full_name: string;

  avatar_url?: string | null;
}
