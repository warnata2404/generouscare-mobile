import { useState } from "react";

import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LineChart } from "react-native-chart-kit";

import ActivityCard from "@/components/dashboard/ActivityCard";
import AgentCard from "@/components/dashboard/AgentCard";
import StatCard from "@/components/dashboard/StatCard";

import { useAgent } from "@/features/agent/useAgent";
import { useDashboard } from "@/features/dashboard/useDashboard";

import { useAuth } from "@/hooks/useAuth";
import { formatRupiah } from "@/lib/currency";
export default function DashboardScreen() {
  useAgent();

  const chartWidth = Dimensions.get("window").width - 32;

  const {
    stats,
    recommendation,
    activities,
    chartData,
    loading,
    refreshDashboard,
  } = useDashboard();

  const { user } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await refreshDashboard();
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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#2563EB"]}
          tintColor="#2563EB"
        />
      }
    >
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Halo, {user?.full_name || "Pengguna"} 👋
        </Text>

        <Text style={styles.welcomeSubText}>
          Selamat datang kembali di GenerousCare
        </Text>
      </View>

      <Text style={styles.header}>Dashboard</Text>

      <Text style={styles.subtitle}>
        Ringkasan kondisi dana dan aktivitas sosial terbaru.
      </Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Dana Tersisa</Text>

        <Text style={styles.heroAmount}>
          {formatRupiah(stats?.remainingFunds ?? 0)}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statsItem}>
          <StatCard
            title="Total Donasi"
            value={formatRupiah(stats?.totalDonations ?? 0)}
          />
        </View>

        <View style={styles.statsItem}>
          <StatCard
            title="Total Pengeluaran"
            value={formatRupiah(stats?.totalExpenses ?? 0)}
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statsItem}>
          <StatCard
            title="Dana Tersalurkan"
            value={`${stats?.distributionRate ?? 0}%`}
          />
        </View>

        <View style={styles.statsItem} />
      </View>

      {recommendation && (
        <AgentCard
          title={recommendation.title}
          description={recommendation.description}
        />
      )}

      {chartData && (
        <>
          <Text style={styles.section}>Grafik Donasi vs Pengeluaran</Text>

          <View style={styles.chartContainer}>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "#22C55E" }]}
                />

                <Text style={styles.legendText}>Donasi</Text>
              </View>

              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "#DC2626" }]}
                />

                <Text style={styles.legendText}>Pengeluaran</Text>
              </View>
            </View>

            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    data: chartData.donations,
                    color: (opacity = 1) => `rgba(34,197,94,${opacity})`,
                    strokeWidth: 3,
                  },
                  {
                    data: chartData.expenses,
                    color: (opacity = 1) => `rgba(220,38,38,${opacity})`,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={chartWidth}
              height={260}
              yAxisLabel="Rp "
              chartConfig={{
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
                labelColor: (opacity = 1) => `rgba(15,23,42,${opacity})`,
                propsForDots: {
                  r: "4",
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </>
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

  welcomeContainer: {
    marginBottom: 20,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  welcomeSubText: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 20,
  },

  heroCard: {
    backgroundColor: "#2563EB",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,

    elevation: 5,
  },

  heroLabel: {
    color: "#DBEAFE",
    fontSize: 14,
    marginBottom: 8,
  },

  heroAmount: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  statsItem: {
    flex: 1,
  },

  section: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 12,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },

  legendText: {
    color: "#0F172A",
    fontWeight: "600",
  },

  chart: {
    borderRadius: 20,
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
