import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";

// Define transaction type
interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  policy: string;
  name: string;
}

// Define grouped transaction type
interface GroupedTransactions {
  date: string;
  data: Transaction[];
}

const TransactionHistory: React.FC = () => {
  // Simplified transaction data with focus on amount, policy, and name
  const transactionData: Transaction[] = [
    {
      id: "1",
      date: "01 May 2025",
      amount: 5200,
      type: "credit",
      policy: "RF8276",
      name: "Raj Sharma",
    },
    {
      id: "2",
      date: "29 Apr 2025",
      amount: 2000,
      type: "credit",
      policy: "Referral",
      name: "Amit Patel",
    },
    {
      id: "3",
      date: "28 Apr 2025",
      amount: -250,
      type: "debit",
      policy: "LI9934",
      name: "Processing Fee",
    },
    {
      id: "4",
      date: "25 Apr 2025",
      amount: 3800,
      type: "credit",
      policy: "HI6723",
      name: "Priya Patel",
    },
    {
      id: "5",
      date: "22 Apr 2025",
      amount: 10000,
      type: "credit",
      policy: "Q1 Bonus",
      name: "Performance Bonus",
    },
    {
      id: "6",
      date: "20 Apr 2025",
      amount: -1500,
      type: "debit",
      policy: "Marketing",
      name: "Premium Materials",
    },
    {
      id: "7",
      date: "15 Apr 2025",
      amount: 9200,
      type: "credit",
      policy: "MF4421",
      name: "Vikram Malhotra",
    },
    {
      id: "8",
      date: "12 Apr 2025",
      amount: -2800,
      type: "debit",
      policy: "HI6701",
      name: "Cancelled Policy",
    },
    {
      id: "9",
      date: "10 Apr 2025",
      amount: -1200,
      type: "debit",
      policy: "Training",
      name: "Sales Techniques",
    },
    {
      id: "10",
      date: "05 Apr 2025",
      amount: 6700,
      type: "credit",
      policy: "LI3358",
      name: "Rahul Verma",
    },
  ];

  type FilterType = "All" | "Credit" | "Debit";
  type SortType = "Date" | "Amount";

  // Filter and sort states
  const [filter, setFilter] = useState<FilterType>("All");
  const [sortBy, setSortBy] = useState<SortType>("Date");
  const [showFilterSort, setShowFilterSort] = useState(false);

  // Filter the data
  let processedData =
    filter === "All"
      ? [...transactionData]
      : filter === "Credit"
      ? transactionData.filter((item) => item.type === "credit")
      : transactionData.filter((item) => item.type === "debit");

  // Sort the data
  if (sortBy === "Date") {
    processedData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Newest first
    });
  } else if (sortBy === "Amount") {
    processedData.sort((a, b) => {
      return Math.abs(b.amount) - Math.abs(a.amount); // Largest first
    });
  }

  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> =
    processedData.reduce(
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

  // Render each transaction item
  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    return (
      <TouchableOpacity style={styles.transactionCard}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionName}>{item.name}</Text>
          <Text style={styles.transactionPolicy}>Policy: {item.policy}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.transactionAmount,
              item.type === "credit" ? styles.creditAmount : styles.debitAmount,
            ]}
          >
            {item.type === "credit" ? "+" : "-"}₹
            {Math.abs(item.amount).toLocaleString("en-IN")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render date section header
  const renderDateHeader = (date: string) => (
    <View style={styles.dateHeaderContainer}>
      <Text style={styles.dateHeaderText}>{date}</Text>
    </View>
  );

  // Render transactions group
  const renderTransactionGroup = ({ item }: { item: GroupedTransactions }) => (
    <View>
      {renderDateHeader(item.date)}
      {item.data.map((transaction) => (
        <View key={transaction.id}>
          {renderTransactionItem({ item: transaction })}
        </View>
      ))}
    </View>
  );

  // Filter/Sort button component
  interface ActionButtonProps {
    title: FilterType | SortType;
    type: "filter" | "sort";
    active: boolean;
  }

  const ActionButton: React.FC<ActionButtonProps> = ({
    title,
    type,
    active,
  }) => (
    <TouchableOpacity
      style={[styles.actionButton, active ? styles.actionButtonActive : null]}
      onPress={() => {
        if (type === "filter") {
          setFilter(title as FilterType);
        } else {
          setSortBy(title as SortType);
        }
      }}
    >
      <Text
        style={[
          styles.actionButtonText,
          active ? styles.actionButtonTextActive : null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Filter/Sort Toggle */}
      <View style={styles.filterSortToggle}>
        <TouchableOpacity
          style={styles.filterSortButton}
          onPress={() => setShowFilterSort(!showFilterSort)}
        >
          <Text style={styles.filterSortText}>
            {showFilterSort ? "Hide Options" : "Filter & Sort"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter/Sort Panel */}
      {showFilterSort && (
        <View style={styles.optionsContainer}>
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Filter by:</Text>
            <View style={styles.optionButtons}>
              <ActionButton
                title="All"
                type="filter"
                active={filter === "All"}
              />
              <ActionButton
                title="Credit"
                type="filter"
                active={filter === "Credit"}
              />
              <ActionButton
                title="Debit"
                type="filter"
                active={filter === "Debit"}
              />
            </View>
          </View>

          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Sort by:</Text>
            <View style={styles.optionButtons}>
              <ActionButton
                title="Date"
                type="sort"
                active={sortBy === "Date"}
              />
              <ActionButton
                title="Amount"
                type="sort"
                active={sortBy === "Amount"}
              />
            </View>
          </View>
        </View>
      )}

      {/* Transactions List */}
      <FlatList
        data={groupedTransactionsArray}
        renderItem={renderTransactionGroup}
        keyExtractor={(item) => item.date}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  filterSortToggle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterSortButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#4f46e5",
  },
  filterSortText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "500",
  },
  optionsContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionSection: {
    marginTop: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  optionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  actionButtonActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  actionButtonText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  actionButtonTextActive: {
    color: "#ffffff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  dateHeaderContainer: {
    paddingVertical: 12,
    marginTop: 8,
  },
  dateHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  transactionCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  transactionPolicy: {
    fontSize: 14,
    color: "#64748b",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  creditAmount: {
    color: "#10b981",
  },
  debitAmount: {
    color: "#ef4444",
  },
});
