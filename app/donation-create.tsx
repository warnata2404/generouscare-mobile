import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { router } from "expo-router";

import DonationForm from "@/components/donations/DonationForm";

import { donationService } from "@/features/donations/donation.service";

export default function DonationCreateScreen() {
  const handleCreate = async (
    amount: number,
    category: string,
    note: string,
    latitude?: number,
    longitude?: number,
    imageUri?: string,
  ) => {
    try {
      await donationService.create({
        amount,
        category,
        note,
        latitude,
        longitude,
        imageUri,
      });

      router.replace("/donations");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error?.message || "Terjadi kesalahan saat menyimpan donasi.",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Tambah Donasi</Text>

      <Text style={styles.subtitle}>Tambahkan data donasi baru.</Text>

      <DonationForm
        submitLabel="Simpan Donasi"
        successMessage="Donasi berhasil ditambahkan."
        onSubmit={handleCreate}
      />
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
