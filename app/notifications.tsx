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

import NotificationCard from "@/components/notifications/NotificationCard";

import { useNotifications } from "@/features/notifications/useNotifications";

export default function NotificationsScreen() {
  const { notifications, loading, refresh } = useNotifications();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await refresh();
    } finally {
      setRefreshing(false);
    }
  };

  const totalNotifications = notifications.length;

  const successCount = notifications.filter(
    (item) => item.type === "success",
  ).length;

  const warningCount = notifications.filter(
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.header}>Pusat Notifikasi</Text>

      <Text style={styles.subtitle}>
        Informasi aktivitas donasi, pengeluaran, dan sistem.
      </Text>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total</Text>

          <Text style={styles.summaryValue}>{totalNotifications}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Berhasil</Text>

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
          <Text style={styles.summaryLabel}>Peringatan</Text>

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

      {notifications.length > 0 ? (
        notifications.map((item) => (
          <NotificationCard
            key={item.id}
            title={item.title}
            message={item.message}
            type={item.type}
            createdAt={item.createdAt}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Belum Ada Notifikasi</Text>

          <Text style={styles.emptyText}>
            Notifikasi dari sistem akan muncul di sini.
          </Text>
        </View>
      )}
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
    marginBottom: 4,
  },

  subtitle: {
    color: "#64748B",
    marginBottom: 20,
  },

  summaryContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 14,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 2,
  },

  summaryLabel: {
    fontSize: 12,

    color: "#64748B",

    marginBottom: 4,
  },

  summaryValue: {
    fontSize: 20,

    fontWeight: "700",

    color: "#0F172A",
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 24,

    alignItems: "center",
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
