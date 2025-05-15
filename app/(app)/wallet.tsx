import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// Define transaction type
type TransactionType = "credit" | "debit";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
  policy: string;
}

// Define grouped transaction type
interface GroupedTransactions {
  date: string;
  data: Transaction[];
}

// Define filter type
type FilterType = "all" | "credit" | "debit";

const Wallet: React.FC = () => {
  // Transaction data focused only on policy credits and debits
  const transactionData: Transaction[] = [
    {
      id: "1",
      date: "01 May 2025",
      amount: 5200,
      type: "credit",
      policy: "RF8276",
    },
    {
      id: "2",
      date: "29 Apr 2025",
      amount: 2000,
      type: "credit",
      policy: "LI9378",
    },
    {
      id: "3",
      date: "28 Apr 2025",
      amount: -250,
      type: "debit",
      policy: "HI6432",
    },
    {
      id: "4",
      date: "25 Apr 2025",
      amount: 3800,
      type: "credit",
      policy: "HI6723",
    },
    {
      id: "5",
      date: "20 Apr 2025",
      amount: -1500,
      type: "debit",
      policy: "LI2245",
    },
    {
      id: "6",
      date: "15 Apr 2025",
      amount: 9200,
      type: "credit",
      policy: "MF4421",
    },
    {
      id: "7",
      date: "12 Apr 2025",
      amount: -2800,
      type: "debit",
      policy: "HI6701",
    },
    {
      id: "8",
      date: "05 Apr 2025",
      amount: 6700,
      type: "credit",
      policy: "LI3358",
    },
  ];

  // Filter state
  const [filter, setFilter] = useState<FilterType>("all");

  // Filter the data
  const filteredData =
    filter === "all"
      ? [...transactionData]
      : transactionData.filter((item) => item.type === filter);

  // Sort by most recent date first
  const sortedData = [...filteredData].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> = sortedData.reduce(
    (groups: Record<string, Transaction[]>, transaction: Transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {}
  );

  // Convert grouped transactions to array format for FlatList
  const groupedTransactionsArray: GroupedTransactions[] = Object.keys(
    groupedTransactions
  ).map((date) => ({
    date,
    data: groupedTransactions[date],
  }));

  // Calculate total balance
  const totalBalance = transactionData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Render each transaction item
  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    return (
      <View style={styles.transactionCard}>
        <View style={styles.policyContainer}>
          <View
            style={[
              styles.iconCircle,
              item.type === "credit" ? styles.creditCircle : styles.debitCircle,
            ]}
          >
            <Feather
              name={
                item.type === "credit" ? "arrow-down-left" : "arrow-up-right"
              }
              size={16}
              color="#fff"
            />
          </View>
          <Text style={styles.policyText}>{item.policy}</Text>
        </View>
        <Text
          style={[
            styles.amountText,
            item.type === "credit" ? styles.creditAmount : styles.debitAmount,
          ]}
        >
          {item.type === "credit" ? "+" : ""}₹
          {Math.abs(item.amount).toLocaleString("en-IN")}
        </Text>
      </View>
    );
  };

  // Render date section header
  const renderDateHeader = (date: string) => (
    <Text style={styles.dateHeaderText}>{date}</Text>
  );

  // Render transactions group
  const renderTransactionGroup = ({ item }: { item: GroupedTransactions }) => (
    <View style={styles.dateGroup}>
      {renderDateHeader(item.date)}
      {item.data.map((transaction) => (
        <View key={transaction.id}>
          {renderTransactionItem({ item: transaction })}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.mainContainer}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <Text style={styles.balanceText}>
            ₹{totalBalance.toLocaleString("en-IN")}
          </Text>
          <Text style={styles.balanceSubtext}>Total Balance</Text>
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Filter Options */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "all" && styles.activeFilter,
              ]}
              onPress={() => setFilter("all")}
            >
              <Feather
                name="layers"
                size={16}
                color={filter === "all" ? "#fff" : "#64748b"}
              />
              <Text
                style={[
                  styles.filterText,
                  filter === "all" && styles.activeFilterText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "credit" && styles.activeFilter,
              ]}
              onPress={() => setFilter("credit")}
            >
              <Feather
                name="arrow-down-left"
                size={16}
                color={filter === "credit" ? "#fff" : "#64748b"}
              />
              <Text
                style={[
                  styles.filterText,
                  filter === "credit" && styles.activeFilterText,
                ]}
              >
                Credits
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "debit" && styles.activeFilter,
              ]}
              onPress={() => setFilter("debit")}
            >
              <Feather
                name="arrow-up-right"
                size={16}
                color={filter === "debit" ? "#fff" : "#64748b"}
              />
              <Text
                style={[
                  styles.filterText,
                  filter === "debit" && styles.activeFilterText,
                ]}
              >
                Debits
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transactions List */}
          <FlatList
            data={groupedTransactionsArray}
            renderItem={renderTransactionGroup}
            keyExtractor={(item) => item.date}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  mainContainer: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 12,
  },
  balanceText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 14,
    color: "#64748b",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: "#3b82f6",
  },
  filterText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  activeFilterText: {
    color: "#ffffff",
  },
  listContent: {
    paddingBottom: 24,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 12,
    marginTop: 8,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  policyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  creditCircle: {
    backgroundColor: "#10b981",
  },
  debitCircle: {
    backgroundColor: "#ef4444",
  },
  policyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
  },
  creditAmount: {
    color: "#10b981",
  },
  debitAmount: {
    color: "#ef4444",
  },
});
