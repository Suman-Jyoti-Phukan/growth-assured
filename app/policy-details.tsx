import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import { useLocalSearchParams } from "expo-router";

// Status text helper (copied from policy list)
const getStatusText = (status: string | number) => {
  switch (String(status)) {
    case "1":
      return "Pending";
    case "2":
      return "Process";
    case "3":
      return "Complete";
    case "4":
      return "Approved";
    default:
      return String(status);
  }
};

const statusColor = {
  Approved: {
    text: "Approved",
    color: "#10B981",
    backgroundColor: "#D1FAE5",
  },
  Complete: {
    text: "Complete",
    color: "#6366F1",
    backgroundColor: "#E0E7FF",
  },
  Process: { text: "Process", color: "#F59E0B", backgroundColor: "#FEF3C7" },
  Pending: { text: "Pending", color: "#F59E0B", backgroundColor: "#FEF3C7" },
  default: { text: "Unknown", color: "#6B7280", backgroundColor: "#F3F4F6" },
};

interface PolicyData {
  id: number;
  client: string;
  employee: string;
  category: string;
  subCategory: string;
  plan_amount: string;
  status: string;
  date: string;
  time: string;
}

interface PolicyDetailScreenProps {
  navigation?: any;
}

const PolicyDetailScreen: React.FC<PolicyDetailScreenProps> = ({
  navigation,
}) => {
  const { policy } = useLocalSearchParams();

  let policyData: PolicyData | null = null;

  try {
    policyData = policy
      ? JSON.parse(Array.isArray(policy) ? policy[0] : policy)
      : null;
  } catch (e) {
    policyData = null;
  }

  const statusText = getStatusText(policyData?.status ?? "");

  const statusInfo =
    statusColor[statusText as keyof typeof statusColor] || statusColor.default;

  const formatAmount = (amount: string): string => {
    const num = Number(amount);
    return isNaN(num) ? amount : `₹${num.toLocaleString()}`;
  };

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Policy Details</Text>
          <Text style={styles.headerSubtitle}>
            View complete policy information
          </Text>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <Icon name="security" size={20} color="#2563EB" />
                <Text style={styles.cardTitle}>
                  {policyData?.category || "-"}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusInfo.backgroundColor },
                ]}
              >
                <Text style={[styles.statusText, { color: statusInfo.color }]}>
                  {statusInfo.text}
                </Text>
              </View>
            </View>
            <Text style={styles.subCategoryText}>
              {policyData?.subCategory || "-"}
            </Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Client:</Text>
              <Text style={styles.detailValue}>
                {policyData?.client || "-"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Employee:</Text>
              <Text style={styles.detailValue}>
                {policyData?.employee || "-"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Plan Amount:</Text>
              <Text style={styles.detailValue}>
                {formatAmount(policyData?.plan_amount || "0")}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <Text style={styles.detailValue}>{statusText}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>
                {policyData?.date || "-"} {policyData?.time || "-"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  subCategoryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  clientCard: {
    backgroundColor: "#EFF6FF",
  },
  employeeCard: {
    backgroundColor: "#ECFDF5",
  },
  infoTextContainer: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  amountCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAF5FF",
    borderRadius: 8,
  },
  amountInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    marginLeft: 12,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 12,
    marginTop: 2,
  },
  freeBadge: {
    backgroundColor: "#DDD6FE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  freeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7C3AED",
  },
  dateTimeInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default PolicyDetailScreen;
