import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState } from "react";

import { router, useLocalSearchParams } from "expo-router";

import { themeColors } from "@/utils/colors";

import axios from "axios";

import { ROOT_URL } from "@/utils/routes";

import { useAuth } from "@/context/AuthContext";
import SkeletonLoader from "@/components/skeleton-loader";

interface FinancialPlanner {
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

export default function FinancialPlannerScreen() {
  const [financialPlanners, setFinancialPlanners] = useState<
    FinancialPlanner[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState("");

  const { parentId } = useLocalSearchParams();

  const { accessToken } = useAuth();

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

        setFinancialPlanners(response.data.data || []);
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

  const renderPlannerCard = ({ item }: { item: FinancialPlanner }) => (
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
      data={financialPlanners}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
      renderItem={renderPlannerCard}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f2f4f7",
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
