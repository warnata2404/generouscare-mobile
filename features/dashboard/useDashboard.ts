import { useEffect, useState } from "react";

import { dashboardService } from "./dashboard.service";

import { ActivityItem, AgentRecommendation, DashboardStats } from "./types";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [recommendation, setRecommendation] =
    useState<AgentRecommendation | null>(null);

  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
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
  };

  return {
    stats,
    recommendation,
    activities,
    loading,
  };
}
