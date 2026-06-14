import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import DonationCard from "@/components/donations/DonationCard";

import { useDonations } from "@/features/donations/useDonations";

export default function DonationsScreen() {
  const { donations, loading, refresh } = useDonations();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Donasi</Text>

      <Text style={styles.subtitle}>
        Seluruh donasi yang tercatat pada sistem.
      </Text>

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
              amount={item.amount}
              category={item.category}
              note={item.note}
              createdAt={item.created_at}
            />
          )}
          showsVerticalScrollIndicator={false}
          onRefresh={refresh}
          refreshing={false}
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
