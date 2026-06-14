import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as Location from "expo-location";

interface DonationFormProps {
  onSubmit: (
    amount: number,
    category: string,
    note: string,
    latitude?: number,
    longitude?: number,
  ) => Promise<void>;
}

export default function DonationForm({ onSubmit }: DonationFormProps) {
  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [note, setNote] = useState("");

  const [latitude, setLatitude] = useState<number | undefined>();

  const [longitude, setLongitude] = useState<number | undefined>();

  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Izin Ditolak", "Aplikasi memerlukan akses lokasi.");

        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLatitude(location.coords.latitude);

      setLongitude(location.coords.longitude);

      Alert.alert("Berhasil", "Lokasi berhasil diambil.");
    } catch {
      Alert.alert("Gagal", "Tidak dapat mengambil lokasi.");
    }
  };

  const handleSubmit = async () => {
    if (!amount || !category || !note) {
      Alert.alert("Validasi", "Semua field wajib diisi.");

      return;
    }

    try {
      setLoading(true);

      await onSubmit(Number(amount), category, note, latitude, longitude);

      setAmount("");
      setCategory("");
      setNote("");

      setLatitude(undefined);
      setLongitude(undefined);

      Alert.alert("Berhasil", "Donasi berhasil ditambahkan.");
    } catch (error: any) {
      Alert.alert("Gagal", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Jumlah Donasi"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Kategori"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Catatan"
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleGetLocation}
      >
        <Text style={styles.locationButtonText}>Ambil Lokasi Saat Ini</Text>
      </TouchableOpacity>

      {latitude && longitude && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Latitude: {latitude}</Text>

          <Text style={styles.locationText}>Longitude: {longitude}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Simpan Donasi</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  locationButton: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  locationButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  locationContainer: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },

  locationText: {
    color: "#1E3A8A",
    marginBottom: 4,
  },

  button: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
