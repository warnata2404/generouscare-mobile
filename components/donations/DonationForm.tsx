import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

interface DonationFormInitialValues {
  amount?: number;

  category?: string;

  note?: string;

  latitude?: number;

  longitude?: number;

  imageUri?: string;
}

interface DonationFormProps {
  initialValues?: DonationFormInitialValues;

  submitLabel?: string;

  successMessage?: string;

  onSubmit: (
    amount: number,
    category: string,
    note: string,
    latitude?: number,
    longitude?: number,
    imageUri?: string,
  ) => Promise<void>;
}

export default function DonationForm({
  onSubmit,
  initialValues,
  submitLabel = "Simpan Donasi",
  successMessage = "Donasi berhasil disimpan.",
}: DonationFormProps) {
  const [amount, setAmount] = useState(initialValues?.amount?.toString() ?? "");

  const [category, setCategory] = useState(initialValues?.category ?? "");

  const [note, setNote] = useState(initialValues?.note ?? "");

  const [latitude, setLatitude] = useState<number | undefined>(
    initialValues?.latitude,
  );

  const [longitude, setLongitude] = useState<number | undefined>(
    initialValues?.longitude,
  );

  const [imageUri, setImageUri] = useState<string | undefined>(
    initialValues?.imageUri,
  );

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

  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Izin Ditolak", "Aplikasi memerlukan akses galeri.");

        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert("Gagal", "Tidak dapat memilih gambar.");
    }
  };

  const resetForm = () => {
    setAmount("");

    setCategory("");

    setNote("");

    setLatitude(undefined);

    setLongitude(undefined);

    setImageUri(undefined);
  };

  const handleSubmit = async () => {
    if (!amount || !category || !note) {
      Alert.alert("Validasi", "Semua field wajib diisi.");

      return;
    }

    try {
      setLoading(true);

      await onSubmit(
        Number(amount),
        category,
        note,
        latitude,
        longitude,
        imageUri,
      );

      Alert.alert("Berhasil", successMessage);

      if (!initialValues) {
        resetForm();
      }
    } catch (error: any) {
      Alert.alert("Gagal", error?.message || "Terjadi kesalahan.");
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

      {latitude && longitude ? (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Latitude: {latitude}</Text>

          <Text style={styles.locationText}>Longitude: {longitude}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
        <Text style={styles.photoButtonText}>Pilih Foto Donasi</Text>
      </TouchableOpacity>

      {imageUri ? (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.previewImage}
        />
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{submitLabel}</Text>
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

  photoButton: {
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  photoButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "#F1F5F9",
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
