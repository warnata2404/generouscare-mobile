import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import ActivityCard from "@/components/dashboard/ActivityCard";
import AgentCard from "@/components/dashboard/AgentCard";
import StatCard from "@/components/dashboard/StatCard";

import { useAgent } from "@/features/agent/useAgent";
import { useDashboard } from "@/features/dashboard/useDashboard";

import { formatRupiah } from "@/lib/currency";

export default function DashboardScreen() {
  useAgent();

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

      <TouchableOpacity
        style={styles.trackerButton}
        onPress={() => router.push("/tracker")}
      >
        <Text style={styles.buttonText}>Lihat Fund Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => router.push("/notifications")}
      >
        <Text style={styles.buttonText}>Notification Center</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.expenseButton}
        onPress={() => router.push("/expenses")}
      >
        <Text style={styles.buttonText}>Kelola Pengeluaran</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.donationButton}
        onPress={() => router.push("/donations")}
      >
        <Text style={styles.buttonText}>Kelola Donasi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.buttonText}>Profil Saya</Text>
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

  trackerButton: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },

  notificationButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },

  expenseButton: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },

  donationButton: {
    backgroundColor: "#7C3AED",
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },

  profileButton: {
    backgroundColor: "#0891B2",
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 24,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
