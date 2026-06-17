import { Tabs } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#2563EB",

        tabBarInactiveTintColor: "#94A3B8",

        tabBarStyle: {
          height: 65,

          paddingBottom: 8,

          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="donations"
        options={{
          title: "Donasi",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="hand-heart"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="expenses"
        options={{
          title: "Pengeluaran",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cash-minus"
              color={color}
              size={size}
            />
          ),
        }}
      />



      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
