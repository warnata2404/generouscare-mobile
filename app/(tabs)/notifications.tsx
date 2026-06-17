import { useState } from "react";

import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppHeader from "@/components/common/AppHeader";
import ScreenContainer from "@/components/common/ScreenContainer";

import NotificationCard from "@/components/notifications/NotificationCard";

import { useNotifications } from "@/features/notifications/useNotifications";

export default function NotificationsScreen() {
  const {
    notifications,
    loading,
    refresh,
    markAsRead,
    markAllAsRead,
    unreadCount,
  } = useNotifications();

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

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isRead === b.isRead) {
      return 0;
    }

    return a.isRead ? 1 : -1;
  });

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
          subtitle="Informasi aktivitas donasi, pengeluaran, dan peringatan sistem."
        />

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total</Text>

            <Text style={styles.summaryValue}>{totalNotifications}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Belum Dibaca</Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: "#2563EB",
                },
              ]}
            >
              {unreadCount}
            </Text>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Donasi</Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: "#16A34A",
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

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Aktivitas Terbaru</Text>

          {unreadCount > 0 && (
            <Text style={styles.markAll} onPress={markAllAsRead}>
              Tandai Semua
            </Text>
          )}
        </View>

        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((item) => (
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
              Notifikasi dari aktivitas sistem akan muncul di sini.
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
    marginBottom: 12,
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

  sectionHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 8,

    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#0F172A",
  },

  markAll: {
    color: "#2563EB",

    fontWeight: "600",

    fontSize: 14,
  },

  emptyContainer: {
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
