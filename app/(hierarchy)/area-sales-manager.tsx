import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

import React from "react";

import { router } from "expo-router";

import { themeColors } from "@/utils/colors";

import { useAuth } from "@/context/AuthContext";

export default function AreaSalesManager() {
  const { userData } = useAuth();

  console.log("Area Sales Manager", userData);

  const renderPlannerCard = ({ item }: { item: IBaseEmployeeType }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>

      <Text style={styles.role}>Area Sales Manager</Text>

      <Text style={styles.contact}>📞 {item.mobile}</Text>

      <Text style={styles.contact}>✉️ {item.email}</Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            router.push({
              pathname: "/(hierarchy)/branch-manager" as never,
              params: {
                parentId: item.id,
              },
            });
          }}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </Pressable>

        {/* <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            router.push("/(hierarchy)/login-report" as never);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable> */}

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
    <>
      <FlatList
        data={userData?.area_sales_managers}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.container}
        renderItem={renderPlannerCard}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No Area Sales Managers found.</Text>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f2f4f7",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
