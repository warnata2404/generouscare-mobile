import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useState } from "react";

import AppHeader from "@/components/common/AppHeader";

import AgentInsightCard from "@/components/agent/AgentInsightCard";

import { useAgent } from "@/features/agent/useAgent";

export default function AgentScreen() {
  const { insights, loading, refresh } = useAgent();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await refresh();
    } finally {
      setRefreshing(false);
    }
  };

  const infoCount = insights.filter((item) => item.type === "info").length;

  const successCount = insights.filter(
    (item) => item.type === "success",
  ).length;

  const warningCount = insights.filter(
    (item) => item.type === "warning",
  ).length;

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
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <AppHeader
        title="Agent Insight"
        subtitle="Analisis otomatis kondisi dana dan distribusi program."
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Insight</Text>

          <Text style={styles.summaryValue}>{insights.length}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Informasi</Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color: "#2563EB",
              },
            ]}
          >
            {infoCount}
          </Text>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Positif</Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color: "#16A34A",
              },
            ]}
          >
            {successCount}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Perhatian</Text>

          <Text
            style={[
              styles.summaryValue,
              {
                color: "#EA580C",
              },
            ]}
          >
            {warningCount}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Insight Terbaru</Text>

      {insights.length > 0 ? (
        insights.map((item, index) => (
          <AgentInsightCard
            key={`${item.title}-${index}`}
            title={item.title}
            message={item.message}
            type={item.type}
          />
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Tidak Ada Insight</Text>

          <Text style={styles.emptyText}>
            Saat ini Agent belum menemukan kondisi yang perlu diperhatikan.
          </Text>
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

  summaryContainer: {
    flexDirection: "row",

    gap: 12,

    marginBottom: 12,
  },

  summaryCard: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 16,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 3,
  },

  summaryLabel: {
    fontSize: 13,

    color: "#64748B",

    marginBottom: 6,
  },

  summaryValue: {
    fontSize: 22,

    fontWeight: "700",

    color: "#0F172A",
  },

  sectionTitle: {
    marginTop: 12,

    marginBottom: 12,

    fontSize: 18,

    fontWeight: "700",

    color: "#0F172A",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 24,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 2,
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
