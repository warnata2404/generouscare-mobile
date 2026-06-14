import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { expenseService } from "./expense.service";

import { ExpenseCategory } from "./types";

export function useExpenseTracker() {
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);

  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const result = await expenseService.getCategoryStatistics();

      setCategories(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    const channel = supabase.channel("expense-tracker");

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "expenses",
        },
        () => {
          loadData();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadData]);

  return {
    categories,
    loading,
  };
}
