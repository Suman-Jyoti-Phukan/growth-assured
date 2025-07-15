import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

import React, { useEffect, useState } from "react";

import { useLocalSearchParams, useRouter, router } from "expo-router";

import { themeColors } from "@/utils/colors";

import axios from "axios";

import { ROOT_URL } from "@/utils/routes";

import { useAuth } from "@/context/AuthContext";

import SkeletonLoader from "@/components/skeleton-loader";

export default function SaleManager() {
  const { parentId } = useLocalSearchParams();

  const { accessToken } = useAuth();

  const [salesManagers, setSalesManagers] = useState<IBaseEmployeeType[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSalesManagers() {
      try {
        const response = await axios.post(
          `${ROOT_URL}/employee/fetchEmployee`,
          { employee_id: parentId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setSalesManagers(response.data.data || []);
      } catch (err: any) {
        console.log("Server error:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchSalesManagers();
  }, [parentId]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  const renderPlannerCard = ({ item }: { item: IBaseEmployeeType }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>Sale Manager</Text>
      <Text style={styles.contact}>📞 {item.mobile}</Text>
      <Text style={styles.contact}>✉️ {item.email}</Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            router.push({
              pathname: "/(hierarchy)/financial-planner" as never,
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <SkeletonLoader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={salesManagers}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
      renderItem={renderPlannerCard}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 12,
    backgroundColor: "#f2f4f7",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
