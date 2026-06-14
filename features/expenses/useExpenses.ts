import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { expenseService } from "./expense.service";
import { Expense } from "./types";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = useCallback(async () => {
    try {
      const result = await expenseService.getAll();

      setExpenses(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();

    const channel = supabase.channel(`expenses-list-${Date.now()}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "expenses",
      },
      () => {
        loadExpenses();
      },
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [loadExpenses]);

  return {
    expenses,
    loading,
    refresh: loadExpenses,
  };
}
