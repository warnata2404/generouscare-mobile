import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCallback, useState } from "react";

import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

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

  const handleDelete = async () => {
    if (!expense) {
      return;
    }

    Alert.alert(
      "Hapus Pengeluaran",
      "Apakah Anda yakin ingin menghapus data ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await expenseService.delete(expense.id);

              Alert.alert("Berhasil", "Pengeluaran berhasil dihapus.");

              router.replace("/expenses");
            } catch (error: any) {
              Alert.alert("Gagal", error.message);
            }
          },
        },
      ],
    );
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      loadData();
    }, [loadData]),
  );

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

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          router.push({
            pathname: "/expense-edit",
            params: {
              id: expense.id,
            },
          })
        }
      >
        <Text style={styles.buttonText}>Edit Pengeluaran</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Hapus Pengeluaran</Text>
      </TouchableOpacity>
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

  editButton: {
    marginTop: 20,

    backgroundColor: "#2563EB",

    padding: 16,

    borderRadius: 16,

    alignItems: "center",
  },

  deleteButton: {
    marginTop: 12,

    backgroundColor: "#DC2626",

    padding: 16,

    borderRadius: 16,

    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontWeight: "700",
  },
});
