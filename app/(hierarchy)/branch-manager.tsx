import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

import React, { useEffect, useState } from "react";

import { router, useLocalSearchParams, useRouter } from "expo-router";

import axios from "axios";

import { ROOT_URL } from "@/utils/routes";

import { useAuth } from "@/context/AuthContext";

import { themeColors } from "@/utils/colors";

import SkeletonLoader from "@/components/skeleton-loader";

export default function BranchManager() {
  const navigation = useRouter();

  const { parentId } = useLocalSearchParams();

  console.log(parentId);

  const { accessToken } = useAuth();

  const [branchManagers, setBranchManagers] = useState<IBaseEmployeeType[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  console.log("Branch Manager", branchManagers);

  useEffect(() => {
    async function fetchBranchManagers() {
      try {
        setLoading(true);
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

        console.log(response.data);

        setBranchManagers(response.data?.data || []);

        setError(null);
      } catch (err) {
        console.log("Server Error", err);

        setError("Failed to load branch managers");
      } finally {
        setLoading(false);
      }
    }

    fetchBranchManagers();
  }, [parentId]);

  const renderPlannerCard = ({ item }: { item: IBaseEmployeeType }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>Branch Manager</Text>
      <Text style={styles.contact}>📞 +91 98765 43210</Text>
      <Text style={styles.contact}>✉️ planner@example.com</Text>

      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            router.push({
              pathname: "/(hierarchy)/sale-manager" as never,
              params: {
                parentId: item.id,
              },
            });
          }}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            navigation.push("/(hierarchy)/login-report" as never);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          onPress={(e) => {
            e.stopPropagation();
            navigation.push("/(hierarchy)/dsr-report" as never);
          }}
        >
          <Text style={styles.buttonText}>DSR Report</Text>
        </Pressable>
      </View>
    </View>
  );

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

  return (
    <FlatList
      data={branchManagers}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
      renderItem={renderPlannerCard}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text>No Branch Managers found.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f2f4f7",
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
