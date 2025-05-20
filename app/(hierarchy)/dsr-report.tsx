import { useState, useEffect } from "react";

import axios from "axios";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { themeColors } from "../../utils/colors";

import { ROOT_URL } from "@/utils/routes";

import { useAuth } from "@/context/AuthContext";

import SkeletonLoader from "@/components/skeleton-loader";
import { useLocalSearchParams } from "expo-router";

interface DsrData {
  id: number;
  name: string;
  mobile: string;
  occupation: string;
  remark: string;
  date: string;
  time: string;
}

export default function DsrReport() {
  const { userId } = useLocalSearchParams();

  console.log(userId);

  const [activeTab, setActiveTab] = useState("all");

  const [dsrReportList, setDsrReportList] = useState<DsrData[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const { accessToken } = useAuth();

  const fetchDsrData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${ROOT_URL}/employee/daily/report/detail`,
        { employee_id: 11 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setDsrReportList(response.data.data || []);
    } catch (err: any) {
      console.log("Server error:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDsrData();
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const getStatusCategory = (date: string) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    if (date === today) return "1";
    if (date === yesterday) return "2";
    return "3";
  };

  const mapStatus = (status: string) => {
    switch (status) {
      case "1":
        return "Recent";
      case "2":
        return "This Week";
      case "3":
        return "Earlier";
      default:
        return "Unknown";
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dsrDataWithStatus = dsrReportList.map((item) => ({
    ...item,
    status: getStatusCategory(item.date),
  }));

  const summaryStats = {
    totalContacts: dsrDataWithStatus.length,
    recentContacts: dsrDataWithStatus.filter((item) => item.status === "1")
      .length,
    thisWeekContacts: dsrDataWithStatus.filter((item) => item.status === "2")
      .length,
    earlierContacts: dsrDataWithStatus.filter((item) => item.status === "3")
      .length,
  };

  const filteredData =
    activeTab === "all"
      ? dsrDataWithStatus
      : dsrDataWithStatus.filter((item) =>
          activeTab === "recent"
            ? item.status === "1"
            : activeTab === "week"
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

  const renderItem = ({ item }: { item: DsrData & { status: string } }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{item.name}</Text>
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
          <Text style={styles.interestType}>{item.occupation}</Text>
          <Text style={styles.subCategory}>{item.remark}</Text>
        </View>
        <Text style={[styles.mobile, { color: themeColors.primary }]}>
          {item.mobile}
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
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text style={styles.loadingText}>Loading DSR data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={48} color="#ff6b6b" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            fetchDsrData();
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>{currentDate}</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: "#eef2ff" }]}>
            <Text style={styles.summaryLabel}>Total Contacts</Text>
            <Text style={styles.summaryValue}>
              {summaryStats.totalContacts}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: "#fff0f0" }]}>
            <Text style={styles.summaryLabel}>Recent</Text>
            <Text style={[styles.summaryValue, { color: "#ff6b6b" }]}>
              {summaryStats.recentContacts}
            </Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: "#fff8f0" }]}>
            <Text style={styles.summaryLabel}>This Week</Text>
            <Text style={[styles.summaryValue, { color: "#ffa06b" }]}>
              {summaryStats.thisWeekContacts}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: "#f0f8ff" }]}>
            <Text style={styles.summaryLabel}>Earlier</Text>
            <Text style={[styles.summaryValue, { color: "#74c0fc" }]}>
              {summaryStats.earlierContacts}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>Contact Activity</Text>

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
            style={[styles.tab, activeTab === "recent" && styles.activeTab]}
            onPress={() => setActiveTab("recent")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "recent" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "week" && styles.activeTab]}
            onPress={() => setActiveTab("week")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "week" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              This Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "earlier" && styles.activeTab]}
            onPress={() => setActiveTab("earlier")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "earlier" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              Earlier
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No contacts found</Text>
            </View>
          }
        />
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
  mobile: {
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
  metaText: {
    fontSize: 12,
    color: "#7d8597",
    marginLeft: 4,
  },
  emptyContainer: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#7d8597",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 10,
    color: "#7d8597",
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    color: "#333333",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: themeColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
