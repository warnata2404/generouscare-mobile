import { useState } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { router } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

export default function RegisterScreen() {
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Validasi",
        text2: "Semua field wajib diisi.",
      });

      return;
    }

    try {
      setLoading(true);

      await register({
        fullName,
        email,
        password,
      });

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Akun berhasil dibuat.",
      });

      router.replace("/login");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Register Gagal",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Register</Text>

          <TextInput
            placeholder="Nama Lengkap"
            value={fullName}
            onChangeText={setFullName}
            style={[styles.input, isFocusedName && styles.inputFocused]}
            onFocus={() => setIsFocusedName(true)}
            onBlur={() => setIsFocusedName(false)}
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, isFocusedEmail && styles.inputFocused]}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(false)}
          />

          <View style={[styles.passwordContainer, isFocusedPassword && styles.inputFocused]}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(false)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Sudah punya akun? Login</Text>
      </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F8FAFC",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },

  inputFocused: {
    borderColor: "#2563EB",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },

  passwordInput: {
    flex: 1,
    padding: 16,
  },

  eyeIcon: {
    padding: 16,
  },

  button: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#16A34A",
  },
});
