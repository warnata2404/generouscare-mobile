import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { donationService } from "./donation.service";

import { Donation, DonationCategoryStatistic } from "./types";

export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);

  const [categoryStatistics, setCategoryStatistics] = useState<
    DonationCategoryStatistic[]
  >([]);

  const [loading, setLoading] = useState(true);

  const loadDonations = useCallback(async () => {
    try {
      const [donationsResult, statisticsResult] = await Promise.all([
        donationService.getAll(),
        donationService.getCategoryStatistics(),
      ]);

      setDonations(donationsResult);

      setCategoryStatistics(statisticsResult);
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

    categoryStatistics,

    loading,

    refresh: loadDonations,
  };
}
