import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { agentService } from "./agent.service";
import { AgentInsight } from "./types";

export function useAgent() {
  const [insights, setInsights] = useState<AgentInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const loadInsights = useCallback(async () => {
    try {
      const result = await agentService.evaluate();

      setInsights(result);
    } catch (error) {
      console.log("AGENT ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInsights();

    const channel = supabase
      .channel(`agent-monitor-${Date.now()}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "donations",
        },
        () => {
          loadInsights();
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
          loadInsights();
        },
      );

    channel.subscribe((status) => {
      console.log("AGENT CHANNEL STATUS:", status);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [loadInsights]);

  return {
    insights,
    loading,
    refresh: loadInsights,
  };
}
