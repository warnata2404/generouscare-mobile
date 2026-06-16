import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCallback, useEffect, useState } from "react";

import { router, useLocalSearchParams } from "expo-router";

import DonationDetailCard from "@/components/donations/DonationDetailCard";

import { donationService } from "@/features/donations/donation.service";

import { Donation } from "@/features/donations/types";

export default function DonationDetailScreen() {
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

  const handleEdit = () => {
    if (!donation) {
      return;
    }

    router.push({
      pathname: "/donation-edit",
      params: {
        id: donation.id,
      },
    });
  };

  const handleDelete = () => {
    if (!donation) {
      return;
    }

    Alert.alert(
      "Hapus Donasi",
      "Apakah Anda yakin ingin menghapus donasi ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await donationService.delete(donation.id);

              Alert.alert("Berhasil", "Donasi berhasil dihapus.");

              router.replace("/donations");
            } catch (error: any) {
              Alert.alert("Gagal", error?.message || "Gagal menghapus donasi.");
            }
          },
        },
      ],
    );
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
      <Text style={styles.header}>Detail Donasi</Text>

      <DonationDetailCard donation={donation} />

      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit Donasi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Hapus Donasi</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    color: "#0F172A",
  },

  editButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 32,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
