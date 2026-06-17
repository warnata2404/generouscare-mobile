import { router } from "expo-router";
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

import AppHeader from "@/components/common/AppHeader";
import ScreenContainer from "@/components/common/ScreenContainer";

import ActivityCard from "@/components/dashboard/ActivityCard";
import AgentCard from "@/components/dashboard/AgentCard";
import StatCard from "@/components/dashboard/StatCard";

import { useAgent } from "@/features/agent/useAgent";
import { useDashboard } from "@/features/dashboard/useDashboard";

import { formatRupiah } from "@/lib/currency";

const getFinancialStatus = (
  remainingFunds: number,
  distributionRate: number,
) => {
  if (remainingFunds < 1000000) {
    return {
      label: "Kritis",
      color: "#DC2626",
    };
  }

  if (distributionRate >= 80) {
    return {
      label: "Sangat Baik",
      color: "#16A34A",
    };
  }

  return {
    label: "Stabil",
    color: "#2563EB",
  };
};

export default function DashboardScreen() {
  const chartWidth = Dimensions.get("window").width - 32;

  const {
    stats,
    activities,
    chartData,
    donationCategoryChart,
    expenseCategoryChart,
    loading,
    refreshDashboard,
  } = useDashboard();

  const { insights, loading: agentLoading } = useAgent();

  const [refreshing, setRefreshing] = useState(false);

  const financialStatus = getFinancialStatus(
    stats?.remainingFunds ?? 0,
    stats?.distributionRate ?? 0,
  );

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
      <ScreenContainer>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
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
        <AppHeader
          title="Dashboard"
          subtitle="Ringkasan kondisi dana dan aktivitas sosial terbaru."
        />

        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Dana Tersisa</Text>

          <Text style={styles.heroAmount}>
            {formatRupiah(stats?.remainingFunds ?? 0)}
          </Text>
        </View>

        <View style={styles.healthCard}>
          <Text style={styles.healthLabel}>Status Keuangan</Text>

          <Text
            style={[
              styles.healthValue,
              {
                color: financialStatus.color,
              },
            ]}
          >
            {financialStatus.label}
          </Text>

          <Text style={styles.healthDescription}>
            Rasio penyaluran dana saat ini {stats?.distributionRate ?? 0}%
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Tingkat Penyaluran Dana</Text>

            <Text style={styles.progressPercentage}>
              {stats?.distributionRate ?? 0}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(stats?.distributionRate ?? 0, 100)}%`,
                },
              ]}
            />
          </View>
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

          <View style={styles.statsItem}>
            <StatCard title="Aktivitas" value={`${activities.length}`} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.section}>Insight Utama</Text>

          <Text style={styles.seeAll} onPress={() => router.push("/agent" as any)}>
            Lihat Semua
          </Text>
        </View>

        {agentLoading ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="small" color="#2563EB" />

            <Text
              style={[
                styles.emptyText,
                {
                  marginTop: 10,
                },
              ]}
            >
              Memuat insight dari Agent...
            </Text>
          </View>
        ) : insights.length > 0 ? (
          <>
            <AgentCard
              title={insights[0].title}
              description={insights[0].message}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Belum ada insight yang tersedia.
            </Text>
          </View>
        )}

        {chartData && (
          <>
            <Text style={styles.section}>Grafik Donasi vs Pengeluaran</Text>

            <View style={styles.chartContainer}>
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      {
                        backgroundColor: "#22C55E",
                      },
                    ]}
                  />

                  <Text style={styles.legendText}>Donasi</Text>
                </View>

                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      {
                        backgroundColor: "#DC2626",
                      },
                    ]}
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

        {donationCategoryChart && (
          <>
            <Text style={styles.section}>Donasi per Kategori</Text>

            <View style={styles.categoryCard}>
              {donationCategoryChart.labels.map((label, index) => (
                <View
                  key={label}
                  style={[
                    styles.categoryRow,
                    index === donationCategoryChart.labels.length - 1 && {
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.categoryName}>{label}</Text>

                  <Text style={styles.categoryAmount}>
                    {formatRupiah(donationCategoryChart.values[index])}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {expenseCategoryChart && (
          <>
            <Text style={styles.section}>Pengeluaran per Kategori</Text>

            <View style={styles.categoryCard}>
              {expenseCategoryChart.labels.map((label, index) => (
                <View key={label} style={styles.categoryRow}>
                  <Text style={styles.categoryName}>{label}</Text>

                  <Text style={styles.categoryAmount}>
                    {formatRupiah(expenseCategoryChart.values[index])}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        <Text style={styles.section}>Aktivitas Terbaru</Text>

        {activities.length > 0 ? (
          activities
            .slice(0, 5)
            .map((activity) => (
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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

  healthCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  healthLabel: {
    fontSize: 13,
    color: "#64748B",
  },

  healthValue: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 6,
  },

  healthDescription: {
    marginTop: 6,
    color: "#64748B",
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 10,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  categoryName: {
    color: "#0F172A",
    fontWeight: "600",
  },

  categoryAmount: {
    color: "#2563EB",
    fontWeight: "700",
  },

  progressCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 18,

    marginBottom: 16,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 3,
  },

  progressHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 12,
  },

  progressLabel: {
    color: "#64748B",

    fontSize: 13,
  },

  progressPercentage: {
    fontSize: 18,

    fontWeight: "700",

    color: "#16A34A",
  },

  progressBackground: {
    height: 12,

    backgroundColor: "#E2E8F0",

    borderRadius: 999,

    overflow: "hidden",
  },

  progressFill: {
    height: 12,

    backgroundColor: "#16A34A",
  },

  sectionHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 20,

    marginBottom: 12,
  },

  seeAll: {
    color: "#2563EB",

    fontWeight: "600",

    fontSize: 14,
  },
});
