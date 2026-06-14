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

interface ProfileFormProps {
  initialFullName: string;
  initialAvatarUrl?: string | null;

  onSubmit: (fullName: string, avatarUrl: string) => Promise<void>;
}

export default function ProfileForm({
  initialFullName,
  initialAvatarUrl,
  onSubmit,
}: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialFullName);

  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || "");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      Alert.alert("Validasi", "Nama lengkap wajib diisi.");

      return;
    }

    try {
      setLoading(true);

      await onSubmit(fullName.trim(), avatarUrl.trim());

      Alert.alert("Berhasil", "Profil berhasil diperbarui.");
    } catch (error: any) {
      Alert.alert("Gagal", error?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama Lengkap</Text>

      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Masukkan nama lengkap"
      />

      <Text style={styles.label}>Avatar URL</Text>

      <TextInput
        style={styles.input}
        value={avatarUrl}
        onChangeText={setAvatarUrl}
        placeholder="https://..."
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Simpan Perubahan</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  label: {
    marginBottom: 6,
    color: "#0F172A",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    borderRadius: 16,

    padding: 14,

    marginBottom: 16,
  },

  button: {
    backgroundColor: "#2563EB",

    padding: 16,

    borderRadius: 16,

    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 16,
  },
});
