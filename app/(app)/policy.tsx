import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

import axios from "axios";

import { ROOT_URL } from "@/utils/routes";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";

// Define Policy and PolicyApiResponse interfaces here for linter
interface Policy {
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

interface PolicyApiResponse {
  status: boolean;
  message: string;
  error_code: boolean;
  error_message: string | null;
  data: Policy[];
  total_amount: number;
}

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

const PolicyCard = ({
  policy,
  onPress,
  getStatusText,
}: {
  policy: Policy;
  onPress: () => void;
  getStatusText: (status: string | number) => string;
}) => (
  <View
    style={{
      backgroundColor: "#fff",
      borderRadius: 18,
      padding: 22,
      marginBottom: 18,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
      borderLeftWidth: 5,
      borderLeftColor: "#6366F1",
      flexDirection: "column",
    }}
  >
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 19,
          fontWeight: "700",
          color: "#1F2937",
          marginBottom: 2,
        }}
      >
        {policy.category}
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: "#6366F1",
          fontWeight: "600",
          marginBottom: 2,
        }}
      >
        {policy.subCategory}
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#6B7280",
          fontWeight: "500",
          marginBottom: 2,
        }}
      >
        Client:{" "}
        <Text style={{ color: "#1F2937", fontWeight: "600" }}>
          {policy.client}
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#6B7280",
          fontWeight: "500",
          marginBottom: 2,
        }}
      >
        Employee:{" "}
        <Text style={{ color: "#1F2937", fontWeight: "600" }}>
          {policy.employee}
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#6B7280",
          fontWeight: "500",
          marginBottom: 2,
        }}
      >
        Plan Amount:{" "}
        <Text style={{ color: "#3B82F6", fontWeight: "700" }}>
          {Number(policy.plan_amount).toLocaleString()}
        </Text>
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}
      >
        <Text
          style={{
            fontSize: 13,
            color: "#6B7280",
            fontWeight: "500",
            marginRight: 8,
          }}
        >
          Status:
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#10B981",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {getStatusText(policy.status)}
        </Text>
      </View>
      <Text style={{ fontSize: 13, color: "#6B7280", fontWeight: "500" }}>
        Date:{" "}
        <Text style={{ color: "#1F2937", fontWeight: "600" }}>
          {policy.date} {policy.time}
        </Text>
      </Text>
    </View>
    <TouchableOpacity
      style={{
        backgroundColor: "#3B82F6",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "700",
          fontSize: 15,
          letterSpacing: 1,
        }}
      >
        View
      </Text>
    </TouchableOpacity>
  </View>
);

const PolicyListScreen = () => {
  const route = useRouter();

  const { accessToken, userData } = useAuth();

  const [policyData, setPolicyData] = useState<PolicyApiResponse | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmployeeDataNew() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${ROOT_URL}/employee/client/fetch/policy`,
          {
            employee_id: userData?.employee.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setPolicyData(response.data);
        } else {
          setError("Failed to fetch policies");
        }
      } catch (error: any) {
        setError(error?.message || "Failed to fetch policies");
      } finally {
        setLoading(false);
      }
    }
    if (accessToken && userData?.employee.id) {
      fetchEmployeeDataNew();
    }
  }, [accessToken, userData?.employee.id]);

  const handlePolicyPress = (policy: Policy) => {
    route.push({
      pathname: "/policy-details",
      params: {
        policy: JSON.stringify(policy),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerSubtitle}>
            Manage your insurance policies
          </Text>
          {policyData && (
            <Text style={styles.totalAmountText}>
              Total Amount:{" "}
              <Text style={{ color: "#3B82F6", fontWeight: "700" }}>
                {policyData.total_amount.toLocaleString()}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#3B82F6"
            style={{ marginTop: 40 }}
          />
        ) : error ? (
          <Text
            style={{ textAlign: "center", color: "#EF4444", marginTop: 20 }}
          >
            {error}
          </Text>
        ) : policyData && policyData.data.length > 0 ? (
          policyData.data.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              onPress={() => handlePolicyPress(policy)}
              getStatusText={getStatusText}
            />
          ))
        ) : (
          <Text
            style={{ textAlign: "center", color: "#6B7280", marginTop: 20 }}
          >
            No policies found.
          </Text>
        )}
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
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "400",
    marginBottom: 4,
  },
  totalAmountText: {
    fontSize: 18,
    color: "#1F2937",
    fontWeight: "600",
    marginTop: 8,
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
});

export default PolicyListScreen;
