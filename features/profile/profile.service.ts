import { supabase } from "@/lib/supabase";

import { Profile, UpdateProfilePayload } from "./types";

export const profileService = {
  async getProfile(): Promise<Profile | null> {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async updateProfile(payload: UpdateProfilePayload) {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      throw new Error("User tidak ditemukan");
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: payload.full_name,
        avatar_url: payload.avatar_url,
      })
      .eq("id", authData.user.id);

    if (error) {
      throw error;
    }
  },

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  },
};
