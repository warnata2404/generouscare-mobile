import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCallback, useEffect, useState } from "react";

import { useLocalSearchParams } from "expo-router";

import ExpenseDetailCard from "@/components/expenses/ExpenseDetailCard";

import { expenseService } from "@/features/expenses/expense.service";

import { Expense } from "@/features/expenses/types";

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams();

  const [expense, setExpense] = useState<Expense | null>(null);

  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const result = await expenseService.getById(String(id));

      setExpense(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!expense) {
    return (
      <View style={styles.center}>
        <Text>Pengeluaran tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Detail Pengeluaran</Text>

      <ExpenseDetailCard expense={expense} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
  },
});
