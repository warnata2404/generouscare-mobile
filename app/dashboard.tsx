import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LineChart } from "react-native-chart-kit";

import ActivityCard from "@/components/dashboard/ActivityCard";
import AgentCard from "@/components/dashboard/AgentCard";
import StatCard from "@/components/dashboard/StatCard";

import { useAgent } from "@/features/agent/useAgent";
import { useDashboard } from "@/features/dashboard/useDashboard";

import { formatRupiah } from "@/lib/currency";

export default function DashboardScreen() {
  useAgent();

  const chartWidth = Dimensions.get("window").width - 32;

  const { stats, recommendation, activities, chartData, loading } =
    useDashboard();

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
        title="Dana Tersisa"
        value={formatRupiah(stats?.remainingFunds ?? 0)}
      />

      <StatCard
        title="Total Donasi"
        value={formatRupiah(stats?.totalDonations ?? 0)}
      />

      <StatCard
        title="Total Pengeluaran"
        value={formatRupiah(stats?.totalExpenses ?? 0)}
      />

      <View style={styles.counterRow}>
        <View style={styles.counterItem}>
          <StatCard
            title="Jumlah Donasi"
            value={String(stats?.donationCount ?? 0)}
          />
        </View>

        <View style={styles.counterItem}>
          <StatCard
            title="Jumlah Pengeluaran"
            value={String(stats?.expenseCount ?? 0)}
          />
        </View>
      </View>

      {chartData && (
        <>
          <Text style={styles.section}>Grafik Donasi vs Pengeluaran</Text>

          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    data: chartData.donations,
                  },
                  {
                    data: chartData.expenses,
                  },
                ],
                legend: ["Donasi", "Pengeluaran"],
              }}
              width={chartWidth}
              height={260}
              yAxisLabel="Rp "
              chartConfig={{
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
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

      <Text style={styles.section}>Menu Cepat</Text>

      <View style={styles.menuGrid}>
        <TouchableOpacity
          style={[styles.menuCard, styles.donationMenu]}
          onPress={() => router.push("/donations")}
        >
          <MaterialCommunityIcons name="hand-heart" size={32} color="#FFFFFF" />

          <Text style={styles.menuText}>Donasi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuCard, styles.expenseMenu]}
          onPress={() => router.push("/expenses")}
        >
          <MaterialCommunityIcons name="cash-minus" size={32} color="#FFFFFF" />

          <Text style={styles.menuText}>Pengeluaran</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuCard, styles.trackerMenu]}
          onPress={() => router.push("/tracker")}
        >
          <MaterialCommunityIcons name="chart-line" size={32} color="#FFFFFF" />

          <Text style={styles.menuText}>Tracker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuCard, styles.notificationMenu]}
          onPress={() => router.push("/notifications")}
        >
          <MaterialCommunityIcons name="bell" size={32} color="#FFFFFF" />

          <Text style={styles.menuText}>Notifikasi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuCard, styles.profileMenu]}
          onPress={() => router.push("/profile")}
        >
          <MaterialCommunityIcons name="account" size={32} color="#FFFFFF" />

          <Text style={styles.menuText}>Profil</Text>
        </TouchableOpacity>
      </View>
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

  counterRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },

  counterItem: {
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
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: "center",
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

  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  menuCard: {
    width: "48%",
    height: 120,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },

  donationMenu: {
    backgroundColor: "#7C3AED",
  },

  expenseMenu: {
    backgroundColor: "#DC2626",
  },

  trackerMenu: {
    backgroundColor: "#22C55E",
  },

  notificationMenu: {
    backgroundColor: "#2563EB",
  },

  profileMenu: {
    backgroundColor: "#0891B2",
  },

  menuText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 10,
  },
});
