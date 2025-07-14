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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface Employee {
  id: number;
  unique_code: string;
  name: string;
  mobile: string;
  email: string;
  type: string;
}

interface BankDetails {
  id: number;
  employee_id: number;
  name: string;
  bank_name: string;
  branch_name: string;
  acc_no: string;
  ifsc: string;
  micr: string;
  created_at: string;
  updated_at: string;
}

interface Policy {
  id: number;
  employee_id: number;
  uu_id: string | null;
  client_id: number;
  category_id: number;
  sub_category_id: number;
  plan_amount: string;
  gst_perc: string;
  commission_amount: string;
  status: string;
  approved_at: string;
  created_at: string;
  updated_at: string;
}

interface EmployeeDataResponse {
  status: boolean;
  message: string;
  error_code: boolean;
  error_message: string | null;
  data: Employee[];
  bank_details: BankDetails | null;
  drs_data: any[];
  policies: Policy[];
  app_writeup: any;
}

const PolicyListScreen = () => {
  const route = useRouter();

  const { accessToken, userData } = useAuth();

  const [employeeData, setEmployeeData] = useState<EmployeeDataResponse | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<any[]>([]);

  const [subCategories, setSubCategories] = useState<any[]>([]);

  const [catLoading, setCatLoading] = useState(false);

  const [catError, setCatError] = useState<string | null>(null);

  const [subCatLoading, setSubCatLoading] = useState(false);

  const [subCatError, setSubCatError] = useState<string | null>(null);

  const handlePolicyPress = (policy: any) => {
    console.log("Policy pressed:", policy);
    route.push({
      pathname: "/policy-details",
      params: {
        policy: JSON.stringify(policy),
      },
    });
  };

  const getEmployeeDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${ROOT_URL}/employee/fetchEmployee`,
        {
          employee_id: userData?.employee.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Response Data", JSON.stringify(response.data, null, 2));

      setEmployeeData(response.data);
    } catch (error: any) {
      console.log(error);
      setError(error?.message || "Failed to fetch employee details");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCatLoading(true);
    setCatError(null);
    try {
      const response = await axios.get(`${ROOT_URL}/employee/category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCategories(response.data.data || []);
    } catch (err: any) {
      setCatError(err?.message || "Failed to fetch categories");
    } finally {
      setCatLoading(false);
    }
  };

  const fetchSubCategories = async (categoryIds: number[]) => {
    setSubCatLoading(true);
    setSubCatError(null);
    try {
      const allSubCats: any[] = [];
      for (const categoryId of categoryIds) {
        const response = await axios.post(
          `${ROOT_URL}/employee/sub_category`,
          { category_id: categoryId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.data) {
          allSubCats.push(...response.data.data);
        }
      }
      setSubCategories(allSubCats);
    } catch (err: any) {
      setSubCatError(err?.message || "Failed to fetch subcategories");
    } finally {
      setSubCatLoading(false);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      if (accessToken && userData?.employee.id) {
        await getEmployeeDetail();
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (employeeData?.policies && employeeData.policies.length > 0) {
      fetchCategories();

      const uniqueCatIds = Array.from(
        new Set(employeeData.policies.map((p) => p.category_id))
      );
      fetchSubCategories(uniqueCatIds);
    }
  }, [employeeData]);

  const getCategoryName = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "-";
  };

  const getSubCategoryName = (id: number) => {
    const sub = subCategories.find((s) => s.id === id);
    return sub ? sub.name : "-";
  };

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

  const policiesWithNames = (employeeData?.policies || []).map((policy) => ({
    ...policy,
    category_name:
      categories.find((c) => c.id === policy.category_id)?.name || "-",
    sub_category_name:
      subCategories.find((s) => s.id === policy.sub_category_id)?.name || "-",
    status_text: getStatusText(policy.status),
  }));

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
        {loading || catLoading || subCatLoading ? (
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
        ) : catError ? (
          <Text
            style={{ textAlign: "center", color: "#EF4444", marginTop: 20 }}
          >
            {catError}
          </Text>
        ) : subCatError ? (
          <Text
            style={{ textAlign: "center", color: "#EF4444", marginTop: 20 }}
          >
            {subCatError}
          </Text>
        ) : policiesWithNames.length > 0 ? (
          policiesWithNames.map((policy) => (
            <View
              key={policy.id}
              style={[
                styles.policyCard,
                {
                  padding: 24,
                  borderLeftWidth: 4,
                  borderLeftColor: "#3B82F6",
                  marginBottom: 20,
                },
              ]}
            >
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#1F2937",
                    marginBottom: 8,
                  }}
                >
                  {policy.category_name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#6366F1",
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  {policy.sub_category_name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
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
                    {policy.status_text}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 13, color: "#6B7280", fontWeight: "500" }}
                >
                  Created:{" "}
                  <Text style={{ color: "#1F2937", fontWeight: "600" }}>
                    {formatDate(policy.created_at)}
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
                onPress={() => handlePolicyPress(policy)}
                activeOpacity={0.8}
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
