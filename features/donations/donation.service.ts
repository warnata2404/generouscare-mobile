import { supabase } from "@/lib/supabase";

import { CreateDonationPayload, Donation } from "./types";

export const donationService = {
  async getAll(): Promise<Donation[]> {
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data ?? [];
  },

  async getById(id: string): Promise<Donation | null> {
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async create(payload: CreateDonationPayload) {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      throw new Error("User tidak ditemukan");
    }

    const { error } = await supabase.from("donations").insert({
      user_id: authData.user.id,

      amount: payload.amount,

      category: payload.category,

      note: payload.note,

      latitude: payload.latitude,

      longitude: payload.longitude,

      photo_url: payload.photo_url,
    });

    if (error) {
      throw error;
    }
  },
};
