import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCallback, useEffect, useState } from "react";

import { router, useLocalSearchParams } from "expo-router";

import DonationForm from "@/components/donations/DonationForm";

import { donationService } from "@/features/donations/donation.service";

import { Donation } from "@/features/donations/types";

export default function DonationEditScreen() {
  const { id } = useLocalSearchParams();

  const [donation, setDonation] = useState<Donation | null>(null);

  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const result = await donationService.getById(String(id));

      setDonation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdate = async (
    amount: number,
    category: string,
    note: string,
    latitude?: number,
    longitude?: number,
    imageUri?: string,
  ) => {
    if (!donation) {
      return;
    }

    try {
      await donationService.update(donation.id, {
        amount,
        category,
        note,
        latitude,
        longitude,
        imageUri,
        photo_url: donation.photo_url ?? undefined,
      });

      router.replace({
        pathname: "/donation-detail",
        params: {
          id: donation.id,
        },
      });
    } catch (error: any) {
      Alert.alert("Gagal", error?.message || "Gagal memperbarui donasi.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!donation) {
    return (
      <View style={styles.center}>
        <Text>Donasi tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Edit Donasi</Text>

      <Text style={styles.subtitle}>
        Perbarui informasi donasi yang telah tersimpan.
      </Text>

      <DonationForm
        initialValues={{
          amount: donation.amount,
          category: donation.category,
          note: donation.note,
          latitude: donation.latitude ?? undefined,
          longitude: donation.longitude ?? undefined,
          imageUri: donation.photo_url ?? undefined,
        }}
        submitLabel="Update Donasi"
        successMessage="Donasi berhasil diperbarui."
        onSubmit={handleUpdate}
      />
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

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 20,
  },
});
