import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

import React from "react";

import { organization } from "@/utils/fakeData";

import { useRouter } from "expo-router";

import { router } from "expo-router";

import { themeColors } from "@/utils/colors";

interface ISaleManager {
  name: string;
  role: string;
  dsr: {
    date: string;
    totalCalls: number;
    meetings: number;
    amount: number;
  };
  policiesSold: { clientName: string; amount: number }[];
}

export default function SaleManager() {
  const navigation = useRouter();

  const branchManagers = organization.areaSalesManagers.flatMap((asm) =>
    asm.branchManagers.flatMap((bm) => bm.salesManagers || [])
  );

  const renderPlannerCard = ({ item }: { item: ISaleManager }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>

      <Text style={styles.role}>{item.role}</Text>

      <Text style={styles.contact}>📞 +91 98765 43210</Text>

      <Text style={styles.contact}>✉️ planner@example.com</Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            navigation.navigate("/(hierarchy)/financial-planner" as never);
          }}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            router.push("/(hierarchy)/login-report" as never);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            router.push("/(hierarchy)/dsr-report" as never);
          }}
        >
          <Text style={styles.buttonText}>DSR Report</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      data={branchManagers}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
      renderItem={renderPlannerCard}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f2f4f7",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1f2937",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: themeColors.primary,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  contact: {
    fontSize: 14,
    color: "#374151",
    marginVertical: 6,
  },
  button: {
    backgroundColor: themeColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
