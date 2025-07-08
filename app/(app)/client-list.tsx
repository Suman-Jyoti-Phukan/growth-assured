import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

interface Client {
  id: string;
  name: string;
  policyAmount: number;
  insuranceAmount: number;
  status: "pending" | "approved";
}

interface ClientListProps {
  clients?: Client[];
}

const defaultClients: Client[] = [
  {
    id: "1",
    name: "Ranjan Bora",
    policyAmount: 250000,
    insuranceAmount: 15000,
    status: "approved",
  },
  {
    id: "2",
    name: "Priyanka Kalita",
    policyAmount: 500000,
    insuranceAmount: 28000,
    status: "pending",
  },
  {
    id: "3",
    name: "Bikash Sharma",
    policyAmount: 750000,
    insuranceAmount: 42000,
    status: "approved",
  },
  {
    id: "4",
    name: "Anita Devi",
    policyAmount: 300000,
    insuranceAmount: 18500,
    status: "pending",
  },
  {
    id: "5",
    name: "Dipankar Gogoi",
    policyAmount: 1000000,
    insuranceAmount: 55000,
    status: "approved",
  },
  {
    id: "6",
    name: "Rashmi Baruah",
    policyAmount: 400000,
    insuranceAmount: 22000,
    status: "pending",
  },
  {
    id: "7",
    name: "Jitul Das",
    policyAmount: 350000,
    insuranceAmount: 20000,
    status: "approved",
  },
  {
    id: "8",
    name: "Mamoni Saikia",
    policyAmount: 600000,
    insuranceAmount: 35000,
    status: "pending",
  },
];

export default function ClientList({ clients = defaultClients }) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderStatusBadge = (status: "pending" | "approved") => (
    <View
      style={[
        styles.statusBadge,
        status === "approved" ? styles.approvedBadge : styles.pendingBadge,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          status === "approved" ? styles.approvedText : styles.pendingText,
        ]}
      >
        {status.toUpperCase()}
      </Text>
    </View>
  );

  const renderClientItem = ({ item }: { item: Client }) => (
    <View style={styles.clientCard}>
      <View style={styles.clientHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </Text>
        </View>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{item.name}</Text>
          {renderStatusBadge(item.status)}
        </View>
      </View>
      <View style={styles.amountContainer}>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Policy Amount</Text>
          <Text style={styles.policyAmount}>
            {formatCurrency(item.policyAmount)}
          </Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Commission Amount</Text>
          <Text style={styles.insuranceAmount}>
            {formatCurrency(item.insuranceAmount)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        data={clients}
        renderItem={renderClientItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  listContainer: {
    padding: 16,
  },
  clientCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  clientHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  approvedBadge: {
    backgroundColor: "#dcfce7",
  },
  pendingBadge: {
    backgroundColor: "#fef3c7",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  approvedText: {
    color: "#166534",
  },
  pendingText: {
    color: "#92400e",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  amountLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 4,
    textAlign: "center",
  },
  policyAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#059669",
    textAlign: "center",
  },
  insuranceAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#dc2626",
    textAlign: "center",
  },
});
