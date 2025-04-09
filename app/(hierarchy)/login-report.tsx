import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { themeColors } from "../../utils/colors";

// Fake data for the report
const FAKE_LOGIN_DATA = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    date: "2025-04-09",
    time: "09:30 AM",
    policyType: "Auto Insurance",
    amount: 1200,
    status: "Sold",
    policyNumber: "POL-AUTO-1234",
  },
  {
    id: "2",
    clientName: "Mark Williams",
    date: "2025-04-09",
    time: "11:15 AM",
    policyType: "Home Insurance",
    amount: 850,
    status: "Pending",
    policyNumber: "POL-HOME-5678",
  },
  {
    id: "3",
    clientName: "Emily Davis",
    date: "2025-04-08",
    time: "03:45 PM",
    policyType: "Life Insurance",
    amount: 2500,
    status: "Sold",
    policyNumber: "POL-LIFE-9012",
  },
  {
    id: "4",
    clientName: "David Miller",
    date: "2025-04-08",
    time: "10:20 AM",
    policyType: "Health Insurance",
    amount: 1800,
    status: "Sold",
    policyNumber: "POL-HLTH-3456",
  },
  {
    id: "5",
    clientName: "Jessica Brown",
    date: "2025-04-07",
    time: "02:30 PM",
    policyType: "Travel Insurance",
    amount: 450,
    status: "Pending",
    policyNumber: "POL-TRVL-7890",
  },
  {
    id: "6",
    clientName: "Michael Wilson",
    date: "2025-04-07",
    time: "09:00 AM",
    policyType: "Auto Insurance",
    amount: 1350,
    status: "Sold",
    policyNumber: "POL-AUTO-2345",
  },
];

// Summary statistics
const summaryStats = {
  totalPolicies: 28,
  totalSold: 22,
  totalPending: 6,
  totalAmount: 42350,
  conversionRate: 78.5,
};

export default function LoginReport() {
  const [activeTab, setActiveTab] = useState("all");

  // Filter data based on active tab
  const filteredData =
    activeTab === "all"
      ? FAKE_LOGIN_DATA
      : FAKE_LOGIN_DATA.filter((item) =>
          activeTab === "sold"
            ? item.status === "Sold"
            : item.status === "Pending"
        );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{item.clientName}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: item.status === "Sold" ? "#4cc9f0" : "#f72585" },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.policyInfo}>
          <Text style={styles.policyType}>{item.policyType}</Text>
          <Text style={styles.policyNumber}>{item.policyNumber}</Text>
        </View>
        <Text style={[styles.amount, { color: themeColors.primary }]}>
          ${item.amount.toLocaleString()}
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Policy Activity Report</Text>
        <Text style={styles.headerDate}>April 9, 2025</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: "#eef2ff" }]}>
          <Text style={styles.summaryLabel}>Total Policies</Text>
          <Text style={styles.summaryValue}>{summaryStats.totalPolicies}</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: "#eef2ff" }]}>
          <Text style={styles.summaryLabel}>Total Sold</Text>
          <Text style={[styles.summaryValue, { color: "#4cc9f0" }]}>
            {summaryStats.totalSold}
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: "#eef2ff" }]}>
          <Text style={styles.summaryLabel}>Conversion</Text>
          <Text style={styles.summaryValue}>
            {summaryStats.conversionRate}%
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: "#eef2ff" }]}>
          <Text style={styles.summaryLabel}>Total Value</Text>
          <Text style={styles.summaryValue}>
            ₹{summaryStats.totalAmount.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>Recent Policy Activity</Text>

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
            style={[styles.tab, activeTab === "sold" && styles.activeTab]}
            onPress={() => setActiveTab("sold")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "sold" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              Sold
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "pending" && styles.activeTab]}
            onPress={() => setActiveTab("pending")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "pending" && {
                  color: themeColors.primary,
                  fontWeight: "bold",
                },
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  headerDate: {
    fontSize: 14,
    color: "#7d8597",
    marginTop: 4,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  summaryCard: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
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
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  tabText: {
    color: "#7d8597",
    fontWeight: "500",
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
  policyInfo: {
    flex: 1,
  },
  policyType: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333333",
  },
  policyNumber: {
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
    justifyContent: "flex-start",
    alignItems: "center",
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
});
