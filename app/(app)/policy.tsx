import React from "react";

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { themeColors } from "@/utils/colors";

interface PolicyItem {
  id: string;
  name: string;
  status: string;
  premium: string;
  type: string;
  validity: string;
  icon: string;
}

const policies = [
  {
    id: "1",
    name: "Health Policy",
    status: "Active",
    premium: "$500",
    type: "Individual",
    validity: "1 Year",
    icon: "heart-pulse",
  },
  {
    id: "2",
    name: "Automobile Policy",
    status: "Expired",
    premium: "$300",
    type: "Vehicle",
    validity: "2 Years",
    icon: "car",
  },
  {
    id: "3",
    name: "Life Insurance",
    status: "Active",
    premium: "$1000",
    type: "Family",
    validity: "10 Years",
    icon: "shield-account",
  },
  {
    id: "4",
    name: "Home Insurance",
    status: "Active",
    premium: "$800",
    type: "Property",
    validity: "5 Years",
    icon: "home",
  },
  {
    id: "5",
    name: "Travel Insurance",
    status: "Expired",
    premium: "$200",
    type: "Travel",
    validity: "6 Months",
    icon: "airplane",
  },
];

const renderStatusBadge = (status: string) => {
  const isActive = status === "Active";
  return (
    <View
      style={[
        styles.statusBadge,
        {
          backgroundColor: isActive ? "#E6F9EF" : "#FDEBEC",
        },
      ]}
    >
      <View
        style={[
          styles.statusDot,
          { backgroundColor: isActive ? "#28C76F" : "#EA5455" },
        ]}
      />
      <Text
        style={[styles.statusText, { color: isActive ? "#28C76F" : "#EA5455" }]}
      >
        {status}
      </Text>
    </View>
  );
};

const Policy = () => {
  const { primary } = themeColors;

  const renderPolicyItem = ({ item }: { item: PolicyItem }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.policyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.policyIconContainer}>
          <MaterialCommunityIcons name={item.icon} size={22} color="#FFF" />
        </View>

        <View style={styles.policyTitleContainer}>
          <Text style={styles.policyName}>{item.name}</Text>
          <Text style={styles.policyType}>{item.type}</Text>
        </View>

        {renderStatusBadge(item.status)}
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <FontAwesome name="dollar" size={14} color="#94A3B8" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Premium</Text>
            <Text style={styles.detailValue}>{item.premium}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <MaterialIcons name="timer" size={14} color="#94A3B8" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Validity</Text>
            <Text style={styles.detailValue}>{item.validity}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <MaterialIcons name="arrow-forward-ios" size={12} color={primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FD" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Policies</Text>
        <Text style={styles.headerSubtitle}>
          {policies.filter((p) => p.status === "Active").length} Active •{" "}
          {policies.filter((p) => p.status === "Expired").length} Expired
        </Text>
      </View>

      <FlatList
        data={policies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={renderPolicyItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: responsiveFontSize(1.7),
    color: "#64748B",
  },
  listContainer: {
    paddingBottom: 20,
  },
  policyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  policyIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
  },
  policyTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  policyName: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: "#1E293B",
  },
  policyType: {
    fontSize: responsiveFontSize(1.4),
    color: "#94A3B8",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  statusText: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: "500",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
  },
  detailTextContainer: {
    marginLeft: 8,
  },
  detailLabel: {
    fontSize: responsiveFontSize(1.3),
    color: "#94A3B8",
  },
  detailValue: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: "600",
    color: "#0F172A",
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    marginTop: 8,
  },
  viewDetailsText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
    color: "#6366F1",
    marginRight: 4,
  },
});

export default Policy;
