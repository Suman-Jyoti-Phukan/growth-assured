import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

import React from "react";

import { router } from "expo-router";

import { themeColors } from "@/utils/colors";

import { useAuth } from "@/context/AuthContext";

export default function FinancialPlanner() {
  const { userData } = useAuth();

  return (
    <View style={styles.container}>
      <Pressable style={styles.card}>
        <Text style={styles.name}>{userData?.employee.name}</Text>

        <Text style={styles.role}>Regional Manager</Text>

        <Text style={styles.contact}>{userData?.employee.mobile || "N/A"}</Text>

        <Text style={styles.contact}>✉️ {userData?.employee.email}</Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.9 },
            ]}
            onPress={(e) => {
              e.stopPropagation();
              router.push("/(hierarchy)/login-report" as never);
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.9 },
            ]}
            onPress={(e) => {
              e.stopPropagation();
              router.push("/(hierarchy)/dsr-report" as never);
            }}
          >
            <Text style={styles.buttonText}>DSR Report</Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f2f4f7",
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
    marginVertical: 2,
  },
  dsrBlock: {
    marginTop: 10,
  },
  dsrTitle: {
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  dsrDetail: {
    fontSize: 13,
    color: "#374151",
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
