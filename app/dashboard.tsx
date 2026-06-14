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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <StatCard title="Total Donasi" value={`Rp ${stats?.totalDonations}`} />

      <StatCard
        title="Total Pengeluaran"
        value={`Rp ${stats?.totalExpenses}`}
      />

      <StatCard title="Dana Tersisa" value={`Rp ${stats?.remainingFunds}`} />

      {recommendation && (
        <AgentCard
          title={recommendation.title}
          description={recommendation.description}
        />
      )}

      <Text style={styles.section}>Aktivitas Terbaru</Text>

      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          title={activity.title}
          createdAt={activity.createdAt}
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
    marginBottom: 20,
  },

  section: {
    marginTop: 20,
    marginBottom: 12,
    fontWeight: "700",
    fontSize: 18,
  },
});
