import { useCallback, useEffect, useState } from "react";

import { donationService } from "./donation.service";

import { Donation } from "./types";

export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);

  const [loading, setLoading] = useState(true);

  const loadDonations = useCallback(async () => {
    try {
      const result = await donationService.getAll();

      setDonations(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDonations();
  }, [loadDonations]);

  return {
    donations,

    loading,

    refresh: loadDonations,
  };
}
