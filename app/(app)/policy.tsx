import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

interface IPolicy {
  id: string;
  name: string;
  status: string;
  holderName: string;
  createdAt: string;
}

const policies = [
  {
    id: "1",
    name: "Health Insurance Premium",
    status: "Active",
    holderName: "John Smith",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Auto Insurance Coverage",
    status: "Pending",
    holderName: "Sarah Johnson",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Life Insurance Policy",
    status: "Expired",
    holderName: "Michael Brown",
    createdAt: "2023-12-10",
  },
  {
    id: "4",
    name: "Home Insurance Protection",
    status: "Active",
    holderName: "Emily Davis",
    createdAt: "2024-03-05",
  },
  {
    id: "5",
    name: "Travel Insurance",
    status: "Cancelled",
    holderName: "Robert Wilson",
    createdAt: "2024-01-28",
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "#10B981";
    case "pending":
      return "#F59E0B";
    case "expired":
      return "#EF4444";
    case "cancelled":
      return "#6B7280";
    default:
      return "#6B7280";
  }
};

const getStatusBgColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "#D1FAE5";
    case "pending":
      return "#FEF3C7";
    case "expired":
      return "#FEE2E2";
    case "cancelled":
      return "#F3F4F6";
    default:
      return "#F3F4F6";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PolicyListScreen = () => {
  const route = useRouter();

  const handlePolicyPress = (policy: IPolicy) => {
    console.log("Policy pressed:", policy);

    route.push("/policy-details");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerSubtitle}>
            Manage your insurance policies
          </Text>
        </View>

        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {policies.map((policy) => (
          <TouchableOpacity
            key={policy.id}
            style={styles.policyCard}
            onPress={() => handlePolicyPress(policy)}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.policyName} numberOfLines={2}>
                {policy.name}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBgColor(policy.status) },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(policy.status) },
                  ]}
                >
                  {policy.status}
                </Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Policy Holder</Text>
                <Text style={styles.infoValue} numberOfLines={1}>
                  {policy.holderName}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Created</Text>
                <Text style={styles.infoValue}>
                  {formatDate(policy.createdAt)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
    overflow: "hidden",
  },
  headerContent: {
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "400",
  },
  decorativeCircle1: {
    position: "absolute",
    top: -20,
    right: -40,
    width: 120,
    height: 120,
    backgroundColor: "#3B82F6",
    borderRadius: 60,
    opacity: 0.1,
  },
  decorativeCircle2: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 80,
    height: 80,
    backgroundColor: "#8B5CF6",
    borderRadius: 40,
    opacity: 0.05,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  policyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  policyName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 70,
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardBody: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
});

export default PolicyListScreen;
