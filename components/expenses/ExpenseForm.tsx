import { useState } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { CATEGORIES } from "@/features/shared/categories";
import Toast from "react-native-toast-message";

interface ExpenseFormProps {
  initialAmount?: string;

  initialCategory?: string;

  initialDescription?: string;

  submitLabel?: string;

  onSubmit: (
    amount: number,
    category: string,
    description: string,
  ) => Promise<void>;
}

export default function ExpenseForm({
  initialAmount = "",
  initialCategory = "",
  initialDescription = "",
  submitLabel = "Simpan Pengeluaran",
  onSubmit,
}: ExpenseFormProps) {
  const [amount, setAmount] = useState(initialAmount);

  const [category, setCategory] = useState(initialCategory);

  const [description, setDescription] = useState(initialDescription);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !category || !description) {
      Toast.show({
        type: "error",
        text1: "Validasi",
        text2: "Semua field wajib diisi.",
      });

      return;
    }

    try {
      setLoading(true);

      await onSubmit(Number(amount), category, description);

      setAmount("");
      setCategory("");
      setDescription("");

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Pengeluaran berhasil ditambahkan.",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Jumlah Pengeluaran"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="Pilih Kategori" value="" />

          {CATEGORIES.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Deskripsi"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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

  pickerContainer: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,

    borderColor: "#E2E8F0",

    borderRadius: 16,

    marginBottom: 12,

    overflow: "hidden",
  },

  button: {
    backgroundColor: "#DC2626",

    padding: 16,

    borderRadius: 16,

    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontWeight: "700",
  },
});
