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
import ScreenContainer from "@/components/common/ScreenContainer";

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

  const sortedInsights = [...insights].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const infoCount = insights.filter((item) => item.type === "info").length;

  const successCount = insights.filter(
    (item) => item.type === "success",
  ).length;

  const warningCount = insights.filter(
    (item) => item.type === "warning",
  ).length;

  const latestInsight = sortedInsights.length > 0 ? sortedInsights[0] : null;

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
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <AppHeader
          title="Agent Insight"
          subtitle="Analisis otomatis kondisi dana dan distribusi program."
        />

        <View style={styles.lastUpdateCard}>
          <Text style={styles.lastUpdateLabel}>Update Terakhir Agent</Text>

          <Text style={styles.lastUpdateValue}>
            {latestInsight
              ? new Date(latestInsight.createdAt).toLocaleString("id-ID")
              : "-"}
          </Text>
        </View>

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

        {sortedInsights.length > 0 ? (
          sortedInsights.map((item, index) => (
            <AgentInsightCard
              key={`${item.title}-${index}`}
              title={item.title}
              message={item.message}
              type={item.type}
              createdAt={item.createdAt}
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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  contentContainer: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  lastUpdateCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 16,

    marginBottom: 16,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 3,
  },

  lastUpdateLabel: {
    color: "#64748B",

    fontSize: 13,

    marginBottom: 4,
  },

  lastUpdateValue: {
    color: "#0F172A",

    fontSize: 15,

    fontWeight: "700",
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
