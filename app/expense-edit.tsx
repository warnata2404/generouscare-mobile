import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import ExpenseForm from "@/components/expenses/ExpenseForm";

import { expenseService } from "@/features/expenses/expense.service";
import { Expense } from "@/features/expenses/types";

export default function ExpenseEditScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [expense, setExpense] = useState<Expense | null>(null);

  const [loading, setLoading] = useState(true);

  const loadExpense = useCallback(async () => {
    try {
      const result = await expenseService.getById(id);

      setExpense(result);
    } catch (error: any) {
      Alert.alert("Gagal", error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadExpense();
  }, [loadExpense]);

  const handleUpdate = async (
    amount: number,
    category: string,
    description: string,
  ) => {
    if (!expense) {
      return;
    }

    await expenseService.update(expense.id, {
      amount,
      category,
      description,
    });

    Alert.alert("Berhasil", "Pengeluaran berhasil diperbarui.");

    Alert.alert("Berhasil", "Pengeluaran berhasil diperbarui.");

    router.back();
  };

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
        <Text>Data pengeluaran tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Pengeluaran</Text>

      <ExpenseForm
        initialAmount={String(expense.amount)}
        initialCategory={expense.category}
        initialDescription={expense.description ?? ""}
        submitLabel="Simpan Perubahan"
        onSubmit={handleUpdate}
      />
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

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#0F172A",
  },
});
