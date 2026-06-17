import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { useTracker } from "@/features/tracker/useTracker";

import { formatRupiah } from "@/lib/currency";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Pendidikan":
      return "#2563EB";

    case "Kesehatan":
      return "#16A34A";

    case "Bencana Alam":
      return "#EA580C";

    case "Kemanusiaan":
      return "#7C3AED";

    default:
      return "#64748B";
  }
};

export default function TrackerScreen() {
  const { summary, categories, loading, refresh } = useTracker();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await refresh();
    } finally {
      setRefreshing(false);
    }
  };

  if (loading || !summary) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView
        style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Tracker Dana</Text>

      <Text style={styles.subtitle}>
        Monitoring transparansi pengelolaan dana donasi.
      </Text>

      <View style={styles.mainSummaryCard}>
        <Text style={styles.summaryLabel}>Dana Terkumpul</Text>

        <Text style={styles.mainSummaryValue}>
          {formatRupiah(summary.totalDonations)}
        </Text>
      </View>

      <View style={styles.smallSummaryContainer}>
        <View style={styles.smallSummaryCard}>
          <Text style={styles.summaryLabel}>Tersalurkan</Text>

          <Text style={styles.smallSummaryValue}>
            {formatRupiah(summary.totalExpenses)}
          </Text>
        </View>

        <View style={styles.smallSummaryCard}>
          <Text style={styles.summaryLabel}>Saldo Dana</Text>

          <Text style={styles.smallSummaryValue}>
            {formatRupiah(summary.remainingBalance)}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Progress Penyaluran Dana</Text>

      <View style={styles.progressCard}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${Math.min(summary.distributionPercentage, 100)}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {summary.distributionPercentage}% Dana Tersalurkan
        </Text>

        <Text style={styles.progressDescription}>
          {formatRupiah(summary.totalExpenses)}
          {" dari "}
          {formatRupiah(summary.totalDonations)}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Tracker Per Kategori</Text>

      {categories.map((item) => (
        <View key={item.category} style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text
              style={[
                styles.categoryTitle,
                {
                  color: getCategoryColor(item.category),
                },
              ]}
            >
              {item.category}
            </Text>

            <Text style={styles.categoryPercentage}>{item.percentage}%</Text>
          </View>

          <View style={styles.categoryProgressBackground}>
            <View
              style={[
                styles.categoryProgressFill,
                {
                  width: `${Math.min(item.percentage, 100)}%`,
                  backgroundColor: getCategoryColor(item.category),
                },
              ]}
            />
          </View>

          <View style={styles.categoryInfoRow}>
            <Text style={styles.categoryInfo}>Donasi</Text>

            <Text style={styles.categoryInfoValue}>
              {formatRupiah(item.donationAmount)}
            </Text>
          </View>

          <View style={styles.categoryInfoRow}>
            <Text style={styles.categoryInfo}>Tersalurkan</Text>

            <Text style={styles.categoryInfoValue}>
              {formatRupiah(item.expenseAmount)}
            </Text>
          </View>

          <View style={styles.categoryInfoRow}>
            <Text style={styles.categoryInfo}>Saldo</Text>

            <Text style={styles.categoryInfoValue}>
              {formatRupiah(item.remainingAmount)}
            </Text>
          </View>
        </View>
      ))}
      </ScrollView>
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

  mainSummaryCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 3,
  },

  summaryLabel: {
    fontSize: 13,

    color: "#64748B",
  },

  mainSummaryValue: {
    fontSize: 28,

    fontWeight: "700",

    color: "#16A34A",

    marginTop: 8,
  },

  smallSummaryContainer: {
    flexDirection: "row",

    gap: 12,

    marginBottom: 20,
  },

  smallSummaryCard: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 16,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 2,
  },

  smallSummaryValue: {
    fontSize: 18,

    fontWeight: "700",

    color: "#0F172A",

    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#0F172A",

    marginBottom: 12,
  },

  progressCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 18,

    marginBottom: 20,
  },

  progressBarBackground: {
    height: 12,

    backgroundColor: "#E2E8F0",

    borderRadius: 999,

    overflow: "hidden",
  },

  progressBarFill: {
    height: 12,

    backgroundColor: "#22C55E",
  },

  progressText: {
    marginTop: 10,

    fontWeight: "700",

    color: "#16A34A",
  },

  progressDescription: {
    marginTop: 4,

    color: "#64748B",

    fontSize: 12,
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 16,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOpacity: 0.04,

    shadowRadius: 6,

    elevation: 2,
  },

  categoryHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 10,
  },

  categoryTitle: {
    fontSize: 16,

    fontWeight: "700",
  },

  categoryPercentage: {
    fontWeight: "700",

    color: "#0F172A",
  },

  categoryProgressBackground: {
    height: 8,

    backgroundColor: "#E2E8F0",

    borderRadius: 999,

    overflow: "hidden",

    marginBottom: 12,
  },

  categoryProgressFill: {
    height: 8,

    borderRadius: 999,
  },

  categoryInfoRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 4,
  },

  categoryInfo: {
    color: "#64748B",

    fontSize: 13,
  },

  categoryInfoValue: {
    color: "#0F172A",

    fontSize: 13,

    fontWeight: "600",
  },
});
