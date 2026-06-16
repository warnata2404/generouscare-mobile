import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { dashboardService } from "./dashboard.service";

import {
  ActivityItem,
  AgentRecommendation,
  DashboardStats,
  MonthlyChartData,
} from "./types";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [recommendation, setRecommendation] =
    useState<AgentRecommendation | null>(null);

  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const [chartData, setChartData] = useState<MonthlyChartData | null>(null);

  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    try {
      const [statsData, recommendationData, activitiesData, chartDataResult] =
        await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecommendation(),
          dashboardService.getActivities(),
          dashboardService.getMonthlyChartData(),
        ]);

      setStats(statsData);

      setRecommendation(recommendationData);

      setActivities(activitiesData);

      setChartData(chartDataResult);
    } catch (error) {
      console.error("LOAD DASHBOARD ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();

    const channel = supabase
      .channel(`dashboard-realtime-${Date.now()}`)
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
      );

    channel.subscribe((status) => {
      console.log("DASHBOARD CHANNEL STATUS:", status);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [loadDashboard]);

  return {
    stats,

    recommendation,

    activities,

    chartData,

    loading,
  };
}
