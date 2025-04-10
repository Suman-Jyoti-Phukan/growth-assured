import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { themeColors } from "../../utils/colors";

interface DsrData {
  id: string;
  clientName: string;
  date: string;
  time: string;
  interestType: string;
  estimatedValue: number;
  status: string;
  contactInfo: string;
  notes: string;
}

const FAKE_DSR_DATA = [
  {
    id: "1",
    clientName: "Ramesh Gupta",
    date: "2025-04-09",
    time: "10:15 AM",
    interestType: "Auto Insurance",
    estimatedValue: 1_500,
    status: "Hot Lead",
    contactInfo: "+91 98765 43210",
    notes: "Looking for comprehensive coverage for 2 vehicles",
  },
  {
    id: "2",
    clientName: "Priya Sharma",
    date: "2025-04-09",
    time: "01:30 PM",
    interestType: "Home Insurance",
    estimatedValue: 1_200,
    status: "Warm Lead",
    contactInfo: "+91 87654 32109",
    notes: "Requested quote for new home purchase",
  },
  {
    id: "3",
    clientName: "Rajesh Patel",
    date: "2025-04-08",
    time: "11:45 AM",
    interestType: "Business Insurance",
    estimatedValue: 3_800,
    status: "Hot Lead",
    contactInfo: "+91 76543 21098",
    notes: "Opening new restaurant, needs full coverage",
  },
  {
    id: "4",
    clientName: "Anjali Verma",
    date: "2025-04-08",
    time: "09:20 AM",
    interestType: "Life Insurance",
    estimatedValue: 2_200,
    status: "Cold Lead",
    contactInfo: "+91 65432 10987",
    notes: "Requested information, price sensitive",
  },
  {
    id: "5",
    clientName: "Karan Singh",
    date: "2025-04-07",
    time: "03:40 PM",
    interestType: "Health Insurance",
    estimatedValue: 1_850,
    status: "Warm Lead",
    contactInfo: "+91 54321 09876",
    notes: "Looking for family plan with dental coverage",
  },
  {
    id: "6",
    clientName: "Meera Iyer",
    date: "2025-04-07",
    time: "10:50 AM",
    interestType: "Auto Insurance",
    estimatedValue: 950,
    status: "Hot Lead",
    contactInfo: "+91 43210 98765",
    notes: "Current policy expiring next month, comparing rates",
  },
  {
    id: "7",
    clientName: "Vikram Rao",
    date: "2025-04-06",
    time: "02:15 PM",
    interestType: "Rental Insurance",
    estimatedValue: 450,
    status: "Warm Lead",
    contactInfo: "+91 32109 87654",
    notes: "Moving to new apartment, required by landlord",
  },
];

const summaryStats = {
  totalLeads: 36,
  hotLeads: 14,
  warmLeads: 17,
  coldLeads: 5,
  potentialValue: 65250,
  conversionRate: 22.8,
};

export default function DsrReport() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredData =
    activeTab === "all"
      ? FAKE_DSR_DATA
      : FAKE_DSR_DATA.filter((item) =>
          activeTab === "hot"
            ? item.status === "Hot Lead"
            : activeTab === "warm"
            ? item.status === "Warm Lead"
            : item.status === "Cold Lead"
        );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot Lead":
        return "#ff6b6b";
      case "Warm Lead":
        return "#ffa06b";
      case "Cold Lead":
        return "#74c0fc";
      default:
        return "#6b76ff";
    }
  };

  const renderItem = ({ item }: { item: DsrData }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{item.clientName}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.interestInfo}>
          <Text style={styles.interestType}>{item.interestType}</Text>
          <Text style={styles.contactInfo}>{item.contactInfo}</Text>
        </View>
        <Text style={[styles.amount, { color: themeColors.primary }]}>
          ₹{item.estimatedValue.toLocaleString()}
        </Text>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Notes:</Text>
        <Text style={styles.notes}>{item.notes}</Text>
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
        {/* <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="phone" size={18} color={themeColors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="email-outline" size={18} color={themeColors.primary} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>April 9, 2025</Text>
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
  contactInfo: {
    fontSize: 12,
    color: "#7d8597",
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notesContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7d8597",
    marginBottom: 2,
  },
  notes: {
    fontSize: 13,
    color: "#333333",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
