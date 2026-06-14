export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  created_at?: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;

  login: (payload: LoginPayload) => Promise<void>;

  register: (payload: RegisterPayload) => Promise<void>;

  logout: () => Promise<void>;

  refreshProfile: () => Promise<void>;
}
