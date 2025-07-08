import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import axios from "axios";

import { ROOT_URL } from "@/utils/routes";

import { useAuth } from "@/context/AuthContext";

type TransactionType = "Credit" | "Debit";

interface Transaction {
  id: number;
  date: string;
  time: string;
  amount: string;
  type: TransactionType;
  comment: string;
}

interface GroupedTransactions {
  date: string;
  data: Transaction[];
}

type FilterType = "all" | "Credit" | "Debit";

export default function Wallet() {
  const { accessToken, userData } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [wallet, setWalletHistory] = useState<Transaction[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [walletAmount, setWalletAmount] = useState<number>(0);

  const [filter, setFilter] = useState<FilterType>("all");

  const [isWithdrawModalVisible, setIsWithdrawModalVisible] =
    useState<boolean>(false);

  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const [withdrawComment, setWithdrawComment] = useState<string>("");

  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);

  const filteredData =
    filter === "all"
      ? [...wallet]
      : wallet.filter((item) => item.type === filter);

  const sortedData = [...filteredData].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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

  const groupedTransactionsArray: GroupedTransactions[] = Object.keys(
    groupedTransactions
  ).map((date) => ({
    date,
    data: groupedTransactions[date],
  }));

  const totalBalance = wallet.reduce((sum, item) => {
    const amount = parseFloat(item.amount);
    return sum + (item.type === "Credit" ? amount : -amount);
  }, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const amount = parseFloat(item.amount);
    return (
      <View style={styles.transactionCard}>
        <View style={styles.transactionContent}>
          <View style={styles.policyContainer}>
            <View
              style={[
                styles.iconCircle,
                item.type === "Credit"
                  ? styles.creditCircle
                  : styles.debitCircle,
              ]}
            >
              <Feather
                name={
                  item.type === "Credit" ? "arrow-down-left" : "arrow-up-right"
                }
                size={16}
                color="#fff"
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
          <Text
            style={[
              styles.amountText,
              item.type === "Credit" ? styles.creditAmount : styles.debitAmount,
            ]}
          >
            {item.type === "Credit" ? "+" : "-"}₹
            {amount.toLocaleString("en-IN")}
          </Text>
        </View>
      </View>
    );
  };

  const renderDateHeader = (date: string) => (
    <Text style={styles.dateHeaderText}>{formatDate(date)}</Text>
  );

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    if (parseFloat(withdrawAmount) > totalBalance) {
      Alert.alert("Error", "Insufficient balance");
      return;
    }

    if (!withdrawComment.trim()) {
      Alert.alert("Error", "Please enter a comment");
      return;
    }

    try {
      setIsWithdrawing(true);

      const response = await axios.post(
        `${ROOT_URL}/employee/wallet/request`,
        {
          amount: parseFloat(withdrawAmount),
          comment: withdrawComment.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.status === false) {
        Alert.alert("Error", response.data.message);
        return;
      }

      Alert.alert("Success", "Withdrawal request submitted successfully");
      setIsWithdrawModalVisible(false);
      setWithdrawAmount("");
      setWithdrawComment("");

      // Refresh wallet history
      getWalletHistory();
    } catch (err) {
      console.error("Failed to withdraw:", err);
      Alert.alert("Error", "Failed to process withdrawal. Please try again.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  const getWalletHistory = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${ROOT_URL}/employee/wallet/fetch`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.status === false) {
        return setError(response.data.message);
      }

      const data = response.data.transactions;

      setWalletAmount(response.data.wallet_amount);
      setWalletHistory(data);
    } catch (err) {
      console.error("Failed to fetch wallet history:", err);
      setError("Failed to load wallet data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWalletHistory();
  }, []);

  console.log("Wallet Data:", wallet);

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
        <View style={styles.balanceCard}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Wallet</Text>
            <TouchableOpacity
              style={styles.withdrawButton}
              onPress={() => setIsWithdrawModalVisible(true)}
            >
              <Feather name="minus-circle" size={16} color="#fff" />
              <Text style={styles.withdrawButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceText}>
            ₹{totalBalance.toLocaleString("en-IN")}
          </Text>
          <Text style={styles.balanceSubtext}>Total Balance</Text>
        </View>

        <View style={styles.contentContainer}>
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
                filter === "Credit" && styles.activeFilter,
              ]}
              onPress={() => setFilter("Credit")}
            >
              <Feather
                name="arrow-down-left"
                size={16}
                color={filter === "Credit" ? "#fff" : "#64748b"}
              />
              <Text
                style={[
                  styles.filterText,
                  filter === "Credit" && styles.activeFilterText,
                ]}
              >
                Credits
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "Debit" && styles.activeFilter,
              ]}
              onPress={() => setFilter("Debit")}
            >
              <Feather
                name="arrow-up-right"
                size={16}
                color={filter === "Debit" ? "#fff" : "#64748b"}
              />
              <Text
                style={[
                  styles.filterText,
                  filter === "Debit" && styles.activeFilterText,
                ]}
              >
                Debits
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text style={styles.loadingText}>Loading transactions...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={getWalletHistory}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={groupedTransactionsArray}
              renderItem={renderTransactionGroup}
              keyExtractor={(item) => item.date}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </View>

      <Modal
        visible={isWithdrawModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsWithdrawModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Withdraw Amount</Text>
              <TouchableOpacity
                onPress={() => setIsWithdrawModalVisible(false)}
                style={styles.closeButton}
              >
                <Feather name="x" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.balanceInfoText}>
                Available Balance: ₹{totalBalance.toLocaleString("en-IN")}
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount</Text>
                <TextInput
                  style={styles.amountInput}
                  value={withdrawAmount}
                  onChangeText={setWithdrawAmount}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Comment</Text>
                <TextInput
                  style={styles.commentInput}
                  value={withdrawComment}
                  onChangeText={setWithdrawComment}
                  placeholder="Enter withdrawal reason"
                  multiline
                  numberOfLines={3}
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsWithdrawModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleWithdraw}
                  disabled={isWithdrawing}
                >
                  {isWithdrawing ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.confirmButtonText}>Withdraw</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
  },
  withdrawButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  withdrawButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748b",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
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
  transactionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  policyContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
  transactionDetails: {
    flex: 1,
  },
  commentText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: "#64748b",
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    margin: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
  },
  balanceInfoText: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 8,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f8fafc",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f8fafc",
    textAlignVertical: "top",
    minHeight: 80,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
