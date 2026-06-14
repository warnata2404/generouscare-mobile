import { supabase } from "@/lib/supabase";

import { LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
  async register(payload: RegisterPayload) {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,

      options: {
        data: {
          full_name: payload.fullName,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  },

  async login(payload: LoginPayload) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      throw error;
    }

    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  },

  async getSession() {
    const { data } = await supabase.auth.getSession();

    return data.session;
  },
};
