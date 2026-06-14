import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TrackerCard from "@/components/tracker/TrackerCard";

import { useExpenseTracker } from "@/features/expenses/useExpenseTracker";

export default function TrackerScreen() {
  const { categories, loading } = useExpenseTracker();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Transparent Fund Tracker</Text>

      <Text style={styles.subtitle}>
        Persentase penggunaan dana berdasarkan kategori pengeluaran.
      </Text>

      {categories.map((item) => (
        <TrackerCard
          key={item.category}
          category={item.category}
          amount={item.amount}
          percentage={item.percentage}
        />
      ))}
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
    marginBottom: 4,
    color: "#0F172A",
  },

  subtitle: {
    color: "#64748B",
    marginBottom: 20,
  },
});
