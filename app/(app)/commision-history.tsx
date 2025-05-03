import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
} from "react-native";
import React, { useState } from "react";

// Define the type for a single commission entry
type CommissionItem = {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: "Credited" | "Pending" | "Rejected";
  source: string;
};

export default function CommissionHistory(): JSX.Element {
  const commissionData: CommissionItem[] = [
    {
      id: "1",
      date: "01 May 2025",
      customer: "Raj Sharma",
      amount: 5200,
      status: "Credited",
      source: "Property Sale",
    },
    {
      id: "2",
      date: "28 Apr 2025",
      customer: "Priya Patel",
      amount: 3800,
      status: "Credited",
      source: "Insurance Policy",
    },
    {
      id: "3",
      date: "25 Apr 2025",
      customer: "Amit Kumar",
      amount: 7500,
      status: "Pending",
      source: "Loan Processing",
    },
    {
      id: "4",
      date: "20 Apr 2025",
      customer: "Neha Singh",
      amount: 4300,
      status: "Credited",
      source: "Mutual Fund",
    },
    {
      id: "5",
      date: "15 Apr 2025",
      customer: "Vikram Malhotra",
      amount: 9200,
      status: "Credited",
      source: "Property Sale",
    },
    {
      id: "6",
      date: "12 Apr 2025",
      customer: "Ananya Desai",
      amount: 2800,
      status: "Rejected",
      source: "Insurance Policy",
    },
    {
      id: "7",
      date: "08 Apr 2025",
      customer: "Rahul Verma",
      amount: 6700,
      status: "Credited",
      source: "Loan Processing",
    },
    {
      id: "8",
      date: "03 Apr 2025",
      customer: "Meera Reddy",
      amount: 5100,
      status: "Pending",
      source: "Mutual Fund",
    },
  ];

  const [filter, setFilter] = useState<
    "All" | "Credited" | "Pending" | "Rejected"
  >("All");

  const filteredData =
    filter === "All"
      ? commissionData
      : commissionData.filter((item) => item.status === filter);

  const totalEarnings = commissionData
    .filter((item) => item.status === "Credited")
    .reduce((sum, item) => sum + item.amount, 0);

  const renderCommissionItem: ListRenderItem<CommissionItem> = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.customerName}>{item.customer}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "Credited"
              ? styles.statusCredited
              : item.status === "Pending"
              ? styles.statusPending
              : styles.statusRejected,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.sourceText}>{item.source}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.amountLabel}>Commission Amount</Text>
        <Text style={styles.amountValue}>
          ₹{item.amount.toLocaleString("en-IN")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  type FilterButtonProps = {
    title: "All" | "Credited" | "Pending" | "Rejected";
  };

  const FilterButton = ({ title }: FilterButtonProps): JSX.Element => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === title ? styles.filterActive : null,
      ]}
      onPress={() => setFilter(title)}
    >
      <Text
        style={[
          styles.filterText,
          filter === title ? styles.filterTextActive : null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total Earnings</Text>
        <Text style={styles.summaryAmount}>
          ₹{totalEarnings.toLocaleString("en-IN")}
        </Text>
        <Text style={styles.summaryPeriod}>Current Month</Text>
      </View>

      <View style={styles.filterContainer}>
        <FilterButton title="All" />
        <FilterButton title="Credited" />
        <FilterButton title="Pending" />
        <FilterButton title="Rejected" />
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderCommissionItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
  },
  summaryCard: {
    margin: 16,
    padding: 20,
    backgroundColor: "#4f46e5",
    borderRadius: 16,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 16,
    color: "#e0e7ff",
    fontWeight: "500",
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginVertical: 8,
  },
  summaryPeriod: {
    fontSize: 14,
    color: "#c7d2fe",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  filterActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  filterText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#ffffff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusCredited: {
    backgroundColor: "#dcfce7",
  },
  statusPending: {
    backgroundColor: "#fef9c3",
  },
  statusRejected: {
    backgroundColor: "#fee2e2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sourceText: {
    fontSize: 14,
    color: "#64748b",
  },
  dateText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 12,
  },
  amountLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4f46e5",
  },
});
