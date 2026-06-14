import { useEffect } from "react";
import { Text, View } from "react-native";

import { supabase } from "../lib/supabase";

export default function HomeScreen() {
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const { data, error } = await supabase.auth.getSession();

    console.log("SUPABASE SESSION:", data);

    if (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>GenerousCare Ready</Text>
    </View>
  );
}
