import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

import { agentService } from "./agent.service";

export function useAgent() {
  useEffect(() => {
    agentService.evaluate();

    const channel = supabase.channel("agent-monitor");

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "donations",
        },
        () => {
          agentService.evaluate();
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
          agentService.evaluate();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
