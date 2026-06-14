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

interface DonationFormProps {
  onSubmit: (amount: number, category: string, note: string) => Promise<void>;
}

export default function DonationForm({ onSubmit }: DonationFormProps) {
  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !category || !note) {
      Alert.alert("Validasi", "Semua field wajib diisi.");

      return;
    }

    try {
      setLoading(true);

      await onSubmit(Number(amount), category, note);

      setAmount("");
      setCategory("");
      setNote("");

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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
