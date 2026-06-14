import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { dashboardService } from "./dashboard.service";

import { ActivityItem, AgentRecommendation, DashboardStats } from "./types";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [recommendation, setRecommendation] =
    useState<AgentRecommendation | null>(null);

  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    try {
      const statsData = await dashboardService.getStats();

      const recommendationData = await dashboardService.getRecommendation();

      const activitiesData = await dashboardService.getActivities();

      setStats(statsData);
      setRecommendation(recommendationData);
      setActivities(activitiesData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();

    const channel = supabase.channel("dashboard-realtime");

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "donations",
        },
        () => {
          loadDashboard();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "expenses",
        },
        () => {
          loadDashboard();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadDashboard]);

  return {
    stats,
    recommendation,
    activities,
    loading,
  };
}
