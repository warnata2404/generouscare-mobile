import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { donationService } from "./donation.service";

import { Donation } from "./types";

export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);

  const [loading, setLoading] = useState(true);

  const loadDonations = useCallback(async () => {
    try {
      const result = await donationService.getAll();

      setDonations(result);
    } catch (error) {
      console.error("Load Donations Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDonations();

    const channel = supabase.channel(`donations-realtime-${Date.now()}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "donations",
      },
      () => {
        loadDonations();
      },
    );

    channel.subscribe((status) => {
      console.log("DONATIONS CHANNEL STATUS:", status);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [loadDonations]);

  return {
    donations,
    loading,
    refresh: loadDonations,
  };
}
