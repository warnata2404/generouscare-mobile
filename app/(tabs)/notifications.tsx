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

import NotificationCard from "@/components/notifications/NotificationCard";

import { useNotifications } from "@/features/notifications/useNotifications";

export default function NotificationsScreen() {
  const { notifications, loading, refresh, markAsRead, unreadCount } =
    useNotifications();

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

  const donationCount = notifications.filter(
    (item) => item.category === "donation",
  ).length;

  const expenseCount = notifications.filter(
    (item) => item.category === "expense",
  ).length;

  const systemCount = notifications.filter(
    (item) => item.category === "system",
  ).length;

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
          title="Notifikasi"
          subtitle="Informasi aktivitas donasi, pengeluaran, dan sistem."
        />

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total</Text>

            <Text style={styles.summaryValue}>{totalNotifications}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Donasi</Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: "#2563EB",
                },
              ]}
            >
              {donationCount}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Pengeluaran</Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: "#DC2626",
                },
              ]}
            >
              {expenseCount}
            </Text>
          </View>
        </View>

        <View style={styles.systemCard}>
          <Text style={styles.systemLabel}>Notifikasi Sistem</Text>

          <Text style={styles.systemValue}>{systemCount}</Text>
        </View>

        <View style={styles.unreadCard}>
          <Text style={styles.unreadLabel}>Belum Dibaca</Text>

          <Text style={styles.unreadValue}>{unreadCount}</Text>
        </View>

        {notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationCard
              key={item.id}
              title={item.title}
              message={item.message}
              type={item.type}
              category={item.category}
              isRead={item.isRead}
              createdAt={item.createdAt}
              onPress={() => {
                if (!item.isRead) {
                  markAsRead(item.id);
                }
              }}
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

  summaryContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
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

  systemCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 14,

    marginBottom: 12,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 2,
  },

  systemLabel: {
    color: "#64748B",

    marginBottom: 4,
  },

  systemValue: {
    fontSize: 22,

    fontWeight: "700",

    color: "#64748B",
  },

  unreadCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 14,

    marginBottom: 20,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 2,
  },

  unreadLabel: {
    color: "#2563EB",

    marginBottom: 4,

    fontWeight: "600",
  },

  unreadValue: {
    fontSize: 22,

    fontWeight: "700",

    color: "#2563EB",
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
