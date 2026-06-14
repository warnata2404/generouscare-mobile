import { ScrollView, StyleSheet, Text } from "react-native";

import { router } from "expo-router";

import DonationForm from "@/components/donations/DonationForm";

import { donationService } from "@/features/donations/donation.service";

export default function DonationCreateScreen() {
  const handleCreate = async (
    amount: number,
    category: string,
    note: string,
  ) => {
    await donationService.create({
      amount,
      category,
      note,
    });

    router.replace("/donations");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tambah Donasi</Text>

      <Text style={styles.subtitle}>Tambahkan data donasi baru.</Text>

      <DonationForm onSubmit={handleCreate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
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
});
