import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { router } from "expo-router";

import ExpenseCard from "@/components/expenses/ExpenseCard";

import { useExpenses } from "@/features/expenses/useExpenses";

export default function ExpensesScreen() {
  const { expenses, loading, refresh } = useExpenses();

  const [refreshing, setRefreshing] = useState(false);

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await refresh();
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <View style={styles.container}>
      <Text style={styles.header}>Daftar Pengeluaran</Text>

      <Text style={styles.subtitle}>
        Seluruh pengeluaran yang tercatat pada sistem.
      </Text>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Pengeluaran</Text>

          <Text style={styles.summaryAmount}>
            Rp {totalExpense.toLocaleString("id-ID")}
          </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View>
          <Text style={styles.summaryLabel}>Transaksi</Text>

          <Text style={styles.summaryCount}>{expenses.length}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/expense-create")}
      >
        <Text style={styles.createButtonText}>Tambah Pengeluaran</Text>
      </TouchableOpacity>

      {expenses.length > 0 ? (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCard
              id={item.id}
              category={item.category}
              amount={item.amount}
              description={item.description}
              createdAt={item.created_at}
            />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Belum Ada Pengeluaran</Text>

          <Text style={styles.emptyText}>
            Tambahkan data pengeluaran pertama.
          </Text>
        </View>
      )}
      </View>
    </SafeAreaView>
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
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 20,
    color: "#64748B",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    marginBottom: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 8,

    elevation: 3,
  },

  summaryLabel: {
    fontSize: 13,

    color: "#64748B",

    marginBottom: 6,
  },

  summaryAmount: {
    fontSize: 22,

    fontWeight: "700",

    color: "#DC2626",
  },

  summaryCount: {
    fontSize: 22,

    fontWeight: "700",

    color: "#0F172A",
  },

  summaryDivider: {
    width: 1,

    height: 40,

    backgroundColor: "#E2E8F0",
  },

  createButton: {
    backgroundColor: "#DC2626",

    padding: 14,

    borderRadius: 16,

    marginBottom: 16,
  },

  createButtonText: {
    color: "#FFFFFF",

    textAlign: "center",

    fontWeight: "700",

    fontSize: 16,
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",

    padding: 24,

    borderRadius: 20,

    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#0F172A",

    marginBottom: 8,
  },

  emptyText: {
    color: "#64748B",

    textAlign: "center",
  },
});
