import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

export default function ImageViewerScreen() {
  const { imageUrl } = useLocalSearchParams();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => router.back()}
    >
      <Image
        source={{
          uri: String(imageUrl),
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
