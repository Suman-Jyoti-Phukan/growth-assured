import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { themeColors } from "@/utils/colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { responsiveFontSize } from "react-native-responsive-dimensions";

const withdrawals = [
  { id: "1", amount: "₹100", date: "2025-01-10", status: "Completed" },
  { id: "2", amount: "₹50", date: "2025-01-15", status: "Pending" },
  { id: "3", amount: "₹200", date: "2025-01-20", status: "Completed" },
];

const Wallet = () => {
  const { primary, secondary, background, lightTheme } = themeColors;

  const getStatusColor = (status) => {
    return status === "Completed" ? themeColors.coldLead : themeColors.warmLead;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Wallet</Text>
    </View>
  );

  const renderBalanceCard = () => (
    <View style={styles.balanceCard}>
      <View style={styles.balanceCardContent}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>₹500</Text>
        <TouchableOpacity
          style={[styles.withdrawButton, { backgroundColor: primary }]}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="wallet-outline"
            size={20}
            color="#FFF"
          />
          <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.balanceDecoration, { backgroundColor: secondary }]}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemLeftBorder} />
      <View style={styles.listItemContent}>
        <View style={styles.listItemHeader}>
          <View style={styles.listItemAmount}>
            <Text style={styles.listItemAmountText}>{item.amount}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.listItemDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="date-range" size={16} color={primary} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name={
                item.status === "Completed" ? "check-circle" : "clock-outline"
              }
              size={16}
              color={getStatusColor(item.status)}
            />
            <Text
              style={[
                styles.detailText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <StatusBar backgroundColor={background} barStyle="dark-content" />

      {renderHeader()}
      {renderBalanceCard()}

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>

        <FlatList
          data={withdrawals}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No transactions yet</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "700",
    color: themeColors.primary,
  },
  balanceCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    position: "relative",
  },
  balanceCardContent: {
    padding: 20,
  },
  balanceDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 8,
    height: "100%",
  },
  balanceLabel: {
    fontSize: responsiveFontSize(1.8),
    color: "#666",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: "700",
    color: themeColors.primary,
    marginBottom: 20,
  },
  withdrawButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  withdrawButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
    marginLeft: 8,
  },
  historyContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  historyTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: themeColors.primary,
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  listItemLeftBorder: {
    width: 5,
    height: "100%",
    backgroundColor: themeColors.primary,
  },
  listItemContent: {
    flex: 1,
    padding: 15,
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  listItemAmount: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemAmountText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: themeColors.primary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: "600",
    color: "#fff",
  },
  listItemDetails: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  detailText: {
    fontSize: responsiveFontSize(1.7),
    color: "#666",
    marginLeft: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: responsiveFontSize(1.8),
  },
});

export default Wallet;
