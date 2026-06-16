import { useCallback, useEffect, useState } from "react";

import { trackerService } from "./tracker.service";

import { TrackerCategory, TrackerSummary } from "./types";

export function useTracker() {
  const [summary, setSummary] = useState<TrackerSummary | null>(null);

  const [categories, setCategories] = useState<TrackerCategory[]>([]);

  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [summaryResult, categoryResult] = await Promise.all([
        trackerService.getSummary(),
        trackerService.getCategoryStatistics(),
      ]);

      setSummary(summaryResult);

      setCategories(categoryResult);
    } catch (error) {
      console.log("TRACKER ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    summary,
    categories,
    loading,
    refresh: loadData,
  };
}
