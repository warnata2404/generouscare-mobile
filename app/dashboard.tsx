import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ActivityCard from "@/components/dashboard/ActivityCard";
import AgentCard from "@/components/dashboard/AgentCard";
import StatCard from "@/components/dashboard/StatCard";

import { useDashboard } from "@/features/dashboard/useDashboard";

import { formatRupiah } from "@/lib/currency";

export default function DashboardScreen() {
  const { stats, recommendation, activities, loading } = useDashboard();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Dashboard</Text>

      <Text style={styles.subtitle}>
        Ringkasan kondisi dana dan aktivitas sosial terbaru.
      </Text>

      <StatCard
        title="Total Donasi"
        value={formatRupiah(stats?.totalDonations ?? 0)}
      />

      <StatCard
        title="Total Pengeluaran"
        value={formatRupiah(stats?.totalExpenses ?? 0)}
      />

      <StatCard
        title="Dana Tersisa"
        value={formatRupiah(stats?.remainingFunds ?? 0)}
      />

      {recommendation && (
        <AgentCard
          title={recommendation.title}
          description={recommendation.description}
        />
      )}

      <Text style={styles.section}>Aktivitas Terbaru</Text>

      {activities.length > 0 ? (
        activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            title={activity.title}
            createdAt={activity.createdAt}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada aktivitas.</Text>
        </View>
      )}
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
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 20,
  },

  section: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  emptyText: {
    color: "#64748B",
  },
});
