import { useCallback, useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";

import { useFocusEffect, useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { themeColors } from "../../utils/colors";

import axios from "axios";

import { ROOT_URL } from "@/utils/routes";

import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const router = useRouter();

  const [employeeData, setEmployeeData] = useState<any>();

  const [loginPolicies, setLoginPolicies] = useState<number>(0);

  const [issuePolicies, setIssuePolicies] = useState<number>(0);

  const { accessToken, userData } = useAuth();

  useEffect(() => {
    async function fetchEmployeeData() {
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

        if (response.status === 200) {
          setEmployeeData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchEmployeeData();
  }, []);

  useEffect(() => {
    if (employeeData && Array.isArray(employeeData.policies)) {
      let loginCount = 0;
      let issueCount = 0;
      employeeData.policies.forEach((policy: any) => {
        if (policy.status === "2") {
          loginCount++;
        } else if (policy.status === "3") {
          issueCount++;
        }
      });
      setLoginPolicies(loginCount);
      setIssuePolicies(issueCount);
    } else {
      setLoginPolicies(0);
      setIssuePolicies(0);
    }
  }, [employeeData]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          "Confirm Exit",
          "Are you sure you want to exit the app?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Exit",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeColors.primary}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.header}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{userData?.employee.name}</Text>
          </View>

          <View style={styles.bannerContainer}>
            <Image
              source={require("../../assets/images/banner.jpg")}
              style={styles.bannerImage}
            />
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/policy-holder")}
            >
              <View
                style={[
                  styles.actionIconPlaceholder,
                  { backgroundColor: "rgba(255, 218, 26, 0.2)" },
                ]}
              >
                <Text style={styles.iconText}>📝</Text>
              </View>
              <Text style={styles.actionButtonText}>New Client</Text>
              <Text style={styles.actionButtonDescription}>
                Add a new policy holder
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/daily-report")}
            >
              <View
                style={[
                  styles.actionIconPlaceholder,
                  { backgroundColor: "rgba(0, 51, 102, 0.15)" },
                ]}
              >
                <Text style={styles.iconText}>📊</Text>
              </View>
              <Text style={styles.actionButtonText}>Create DSR</Text>
              <Text style={styles.actionButtonDescription}>
                Daily sales report
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Performance Overview</Text>
            </View>

            <View style={styles.statsCardsRow}>
              <View style={styles.statsCard}>
                <View style={styles.statContent}>
                  <Text style={styles.statAmount}>{loginPolicies}</Text>
                  <Text style={styles.statLabel}>Login</Text>
                </View>
                <View style={styles.statIconWrapper}>
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: "rgba(255, 107, 107, 0.1)" },
                    ]}
                  >
                    <Text style={styles.statIconText}>🔄</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.cardAccent,
                    { backgroundColor: themeColors.hotLead },
                  ]}
                />
              </View>

              <View style={styles.statsCard}>
                <View style={styles.statContent}>
                  <Text style={styles.statAmount}>{issuePolicies}</Text>
                  <Text style={styles.statLabel}>Issued</Text>
                </View>
                <View style={styles.statIconWrapper}>
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: "rgba(255, 218, 26, 0.1)" },
                    ]}
                  >
                    <Text style={styles.statIconText}>✅</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.cardAccent,
                    { backgroundColor: themeColors.secondary },
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.recentActivityContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.activityItem}>
              <View
                style={[
                  styles.activityIcon,
                  { backgroundColor: "rgba(255, 107, 107, 0.15)" },
                ]}
              >
                <Text style={styles.activityIconText}>👤</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New Client Added</Text>
                <Text style={styles.activityDescription}>
                  Rahul Sharma • LIC Policy
                </Text>
                <Text style={styles.activityTime}>Today, 10:45 AM</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View
                style={[
                  styles.activityIcon,
                  { backgroundColor: "rgba(255, 218, 26, 0.15)" },
                ]}
              >
                <Text style={styles.activityIconText}>📋</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Policy Issued</Text>
                <Text style={styles.activityDescription}>
                  Priya Patel • Health Insurance
                </Text>
                <Text style={styles.activityTime}>Yesterday, 3:30 PM</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View
                style={[
                  styles.activityIcon,
                  { backgroundColor: "rgba(0, 51, 102, 0.15)" },
                ]}
              >
                <Text style={styles.activityIconText}>💰</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Premium Collected</Text>
                <Text style={styles.activityDescription}>
                  Amit Kumar • ₹24,500
                </Text>
                <Text style={styles.activityTime}>Mar 14, 2023</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.loadMoreButton}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    marginTop: 8,
    marginBottom: 16,
  },
  greeting: {
    fontSize: responsiveFontSize(2),
    color: "#666",
  },
  userName: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: "bold",
    color: themeColors.primary,
  },
  bannerContainer: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    position: "relative",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 51, 102, 0.7)",
    padding: 16,
  },
  bannerText: {
    color: "#fff",
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
    marginBottom: 8,
  },
  bannerButton: {
    backgroundColor: themeColors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: themeColors.primary,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.6),
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    width: "48%",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIconPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  actionButtonText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    color: themeColors.primary,
    marginBottom: 4,
  },
  actionButtonDescription: {
    fontSize: responsiveFontSize(1.5),
    color: "#888",
    textAlign: "center",
  },
  quickActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickActionButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    color: themeColors.primary,
    fontWeight: "500",
    fontSize: responsiveFontSize(1.7),
  },
  statsContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: "#333",
  },
  viewAllText: {
    fontSize: responsiveFontSize(1.7),
    color: themeColors.primary,
    fontWeight: "500",
  },
  statsCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statsCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    width: "48%",
    flexDirection: "row",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative",
    overflow: "hidden",
  },
  statContent: {
    flex: 1,
  },
  statIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statIconText: {
    fontSize: 18,
  },
  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 4,
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  statAmount: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    color: themeColors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: responsiveFontSize(1.8),
    color: "#666",
  },
  goalProgressContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  goalProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  goalProgressTitle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    color: "#333",
  },
  goalProgressPercentage: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "bold",
    color: themeColors.primary,
  },
  progressBarContainer: {
    marginBottom: 8,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  progressBar: {
    flex: 1,
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    width: "67%",
    height: "100%",
    backgroundColor: themeColors.secondary,
    borderRadius: 6,
  },
  goalProgressText: {
    fontSize: responsiveFontSize(1.7),
    color: "#666",
    textAlign: "right",
  },
  recentActivityContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
    minHeight: 300,
  },
  activityItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 16,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: responsiveFontSize(1.7),
    color: "#666",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: responsiveFontSize(1.5),
    color: "#999",
  },
  loadMoreButton: {
    backgroundColor: themeColors.lightTheme,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  loadMoreText: {
    color: themeColors.primary,
    fontSize: responsiveFontSize(1.8),
    fontWeight: "500",
  },
  emptyStateContainer: {
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: responsiveFontSize(2),
    color: "#888",
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: themeColors.lightTheme,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: themeColors.primary,
    fontWeight: "500",
  },
});
