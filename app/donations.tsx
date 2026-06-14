import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DonationCard from "@/components/donations/DonationCard";

import { useDonations } from "@/features/donations/useDonations";

export default function DonationsScreen() {
  const { donations, loading } = useDonations();

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
      />
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
});
