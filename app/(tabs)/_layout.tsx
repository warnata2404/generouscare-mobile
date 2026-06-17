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
          height: 70,

          paddingTop: 8,

          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,

          fontWeight: "600",
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


<<<<<<< HEAD
=======
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="agent"
        options={{
          title: "Agent",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="robot-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
>>>>>>> origin/main

      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
