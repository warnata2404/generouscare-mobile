import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import AppHeader from "@/components/common/AppHeader";
import ScreenContainer from "@/components/common/ScreenContainer";

import DonationCard from "@/components/donations/DonationCard";

import { useDonations } from "@/features/donations/useDonations";

import { formatRupiah } from "@/lib/currency";

export default function DonationsScreen() {
  const { donations, loading, refresh } = useDonations();

  const [refreshing, setRefreshing] = useState(false);

  const totalDonations = donations.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await refresh();
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
      <View style={styles.container}>
        <AppHeader
          title="Donasi"
          subtitle="Kelola dan pantau seluruh data donasi."
        />

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Donasi</Text>

            <Text style={styles.summaryValue}>
              {formatRupiah(totalDonations)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Jumlah Transaksi</Text>

            <Text style={styles.summaryValue}>{donations.length}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/donation-create")}
        >
          <Text style={styles.createButtonText}>Tambah Donasi</Text>
        </TouchableOpacity>

        {donations.length > 0 ? (
          <FlatList
            data={donations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DonationCard
                id={item.id}
                amount={item.amount}
                category={item.category}
                note={item.note}
                createdAt={item.created_at}
                photoUrl={item.photo_url}
              />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Belum Ada Donasi</Text>

            <Text style={styles.emptyText}>
              Tambahkan data donasi pertama Anda.
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
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
    color: "#64748B",

    fontSize: 13,

    marginBottom: 8,
  },

  summaryValue: {
    color: "#0F172A",

    fontSize: 20,

    fontWeight: "700",
  },

  createButton: {
    backgroundColor: "#22C55E",

    padding: 14,

    borderRadius: 16,

    marginBottom: 16,
  },

  createButtonText: {
    color: "#FFFFFF",

    textAlign: "center",

    fontWeight: "700",

    fontSize: 16,
  },

  listContainer: {
    paddingBottom: 32,
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",

    padding: 24,

    borderRadius: 20,

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
