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

  async uploadDonationPhoto(imageUri: string): Promise<string> {
    try {
      console.log("UPLOAD PHOTO START");

      console.log("IMAGE URI:", imageUri);

      const response = await fetch(imageUri);

      const arrayBuffer = await response.arrayBuffer();

      console.log("ARRAY BUFFER SIZE:", arrayBuffer.byteLength);

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.jpg`;

      console.log("UPLOAD FILE NAME:", fileName);

      const { error } = await supabase.storage
        .from("donations")
        .upload(fileName, arrayBuffer, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (error) {
        console.log("UPLOAD PHOTO ERROR:", error);

        throw error;
      }

      const { data } = supabase.storage
        .from("donations")
        .getPublicUrl(fileName);

      console.log("UPLOAD PHOTO SUCCESS:", data.publicUrl);

      return data.publicUrl;
    } catch (error) {
      console.log("UPLOAD PHOTO FAILED:", error);

      throw error;
    }
  },

  async create(payload: CreateDonationPayload) {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      throw new Error("User tidak ditemukan");
    }

    let photoUrl: string | null = null;

    try {
      console.log("CREATE DONATION START");

      if (payload.imageUri) {
        photoUrl = await this.uploadDonationPhoto(payload.imageUri);
      }

      console.log("INSERT DONATION START");

      const { data, error } = await supabase
        .from("donations")
        .insert({
          user_id: authData.user.id,

          amount: payload.amount,

          category: payload.category,

          note: payload.note,

          latitude: payload.latitude,

          longitude: payload.longitude,

          photo_url: photoUrl,
        })
        .select();

      console.log("INSERT DONATION RESULT:", data);

      if (error) {
        console.log("INSERT DONATION ERROR:", error);

        throw error;
      }

      console.log("CREATE DONATION SUCCESS");
    } catch (error) {
      console.log("CREATE DONATION FAILED:", error);

      throw error;
    }
  },
};
