import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { themeColors } from "../../utils/colors";

import { ROOT_URL } from "@/utils/routes";

import axios from "axios";

import { useAuth } from "@/context/AuthContext";

import SkeletonLoader from "@/components/skeleton-loader";

interface DsrData {
  id: number;
  client: string;
  date: string;
  time: string;
  category: string;
  subCategory: string;
  plan_amount: number | string;
  status: string;
  employee: string;
}

export default function Login() {
  const [activeTab, setActiveTab] = useState("all");

  const { accessToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [loginList, setLoginList] = useState<DsrData[]>([]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const mapStatus = (status: string) => {
    switch (status) {
      case "1":
        return "Hot Lead";
      case "2":
        return "Warm Lead";
      case "3":
        return "Cold Lead";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    async function fetchLoginList() {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${ROOT_URL}/employee/client/fetch/policy`,
          { employee_id: 11 },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setLoginList(response.data.data || []);
      } catch (err: any) {
        console.log("Server error:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLoginList();
  }, []);

  const summaryStats = {
    totalLeads: loginList.length,
    hotLeads: loginList.filter((item) => item.status === "1").length,
    warmLeads: loginList.filter((item) => item.status === "2").length,
    coldLeads: loginList.filter((item) => item.status === "3").length,

    potentialValue: loginList.reduce((sum, item) => {
      const amount =
        typeof item.plan_amount === "string"
          ? parseFloat(item.plan_amount)
          : item.plan_amount || 0;
      return sum + amount;
    }, 0),

    conversionRate:
      loginList.length > 0
        ? Math.round(
            (loginList.filter((item) => item.status === "1").length /
              loginList.length) *
              100 *
              10
          ) / 10
        : 0,
  };

  const filteredData =
    activeTab === "all"
      ? loginList
      : loginList.filter((item) =>
          activeTab === "hot"
            ? item.status === "1"
            : activeTab === "warm"
            ? item.status === "2"
            : item.status === "3"
        );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "1":
        return "#ff6b6b";
      case "2":
        return "#ffa06b";
      case "3":
        return "#74c0fc";
      default:
        return "#6b76ff";
    }
  };

  const renderItem = ({ item }: { item: DsrData }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{item.client}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{mapStatus(item.status)}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.interestInfo}>
          <Text style={styles.interestType}>{item.category}</Text>
          <Text style={styles.subCategory}>{item.subCategory}</Text>
        </View>
        <Text style={[styles.amount, { color: themeColors.primary }]}>
          ₹
          {item.plan_amount
            ? parseFloat(item.plan_amount.toString()).toLocaleString()
            : "0"}
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.dateTime}>
          <Icon name="calendar" size={14} color="#7d8597" />
          <Text style={styles.metaText}>{item.date}</Text>
        </View>
        <View style={styles.dateTime}>
          <Icon name="clock-outline" size={14} color="#7d8597" />
          <Text style={styles.metaText}>{item.time}</Text>
        </View>
        <View style={styles.employeeInfo}>
          <Icon name="account" size={14} color="#7d8597" />
          <Text style={styles.metaText}>{item.employee}</Text>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>{currentDate}</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: "#eef2ff" }]}>
            <Text style={styles.summaryLabel}>Total Leads</Text>
            <Text style={styles.summaryValue}>{summaryStats.totalLeads}</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: "#fff0f0" }]}>
            <Text style={styles.summaryLabel}>Hot Leads</Text>
            <Text style={[styles.summaryValue, { color: "#ff6b6b" }]}>
              {summaryStats.hotLeads}
            </Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: "#fff8f0" }]}>
            <Text style={styles.summaryLabel}>Warm Leads</Text>
            <Text style={[styles.summaryValue, { color: "#ffa06b" }]}>
              {summaryStats.warmLeads}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: "#f0f8ff" }]}>
            <Text style={styles.summaryLabel}>Cold Leads</Text>
            <Text style={[styles.summaryValue, { color: "#74c0fc" }]}>
              {summaryStats.coldLeads}
            </Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Potential Value</Text>
            <Text style={styles.statValue}>
              ₹{summaryStats.potentialValue.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Conversion Rate</Text>
            <Text style={styles.statValue}>{summaryStats.conversionRate}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>Lead Activity</Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "all" && styles.activeTab]}
            onPress={() => setActiveTab("all")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "all" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "hot" && styles.activeTab]}
            onPress={() => setActiveTab("hot")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "hot" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              Hot Leads
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "warm" && styles.activeTab]}
            onPress={() => setActiveTab("warm")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "warm" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              Warm Leads
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "cold" && styles.activeTab]}
            onPress={() => setActiveTab("cold")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "cold" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              Cold Leads
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading data...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No leads found</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  headerSubtitle: {
    fontSize: 16,
    color: themeColors.primary,
    fontWeight: "500",
    marginTop: 2,
  },
  headerDate: {
    fontSize: 14,
    color: "#7d8597",
    marginTop: 4,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryCard: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#7d8597",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
    marginTop: 5,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#7d8597",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeColors.primary,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e9ecef",
    marginHorizontal: 10,
  },
  activityContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    flexWrap: "wrap",
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  tabText: {
    color: "#7d8597",
    fontWeight: "500",
    fontSize: 13,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  interestInfo: {
    flex: 1,
  },
  interestType: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333333",
  },
  subCategory: {
    fontSize: 12,
    color: "#7d8597",
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  dateTime: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  employeeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  metaText: {
    fontSize: 12,
    color: "#7d8597",
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#ff6b6b",
    textAlign: "center",
  },
  emptyContainer: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#7d8597",
    textAlign: "center",
  },
});
