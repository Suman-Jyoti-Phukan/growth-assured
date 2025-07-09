import React from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";

function RefundReturnScreen() {
  const handleBackPress = () => {
    // Handle back navigation
    console.log("Back pressed");
  };

  const handleContactSupport = () => {
    console.log("Contact support pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Refund & Return Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Introduction */}
          <View style={styles.section}>
            <Text style={styles.introText}>
              We want you to be completely satisfied with your purchase. This
              policy outlines how we handle returns and refunds to ensure a
              smooth experience for our customers.
            </Text>
          </View>

          {/* Return Policy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Return Policy</Text>
            <View style={styles.policyItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📅</Text>
              </View>
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>30-Day Return Window</Text>
                <Text style={styles.policyDescription}>
                  Items can be returned within 30 days of purchase for a full
                  refund or exchange.
                </Text>
              </View>
            </View>

            <View style={styles.policyItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📦</Text>
              </View>
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Original Condition</Text>
                <Text style={styles.policyDescription}>
                  Items must be in original, unused condition with all tags and
                  packaging intact.
                </Text>
              </View>
            </View>

            <View style={styles.policyItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🧾</Text>
              </View>
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Proof of Purchase</Text>
                <Text style={styles.policyDescription}>
                  Original receipt or order confirmation required for all
                  returns.
                </Text>
              </View>
            </View>
          </View>

          {/* Refund Process */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Refund Process</Text>
            <View style={styles.stepContainer}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  Initiate return request through your account or contact
                  support
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  Pack items securely and ship using provided return label
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  Refund processed within 3-5 business days after we receive
                  your return
                </Text>
              </View>
            </View>
          </View>

          {/* Non-Returnable Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Non-Returnable Items</Text>
            <View style={styles.restrictionsList}>
              <Text style={styles.restrictionItem}>
                • Personalized or custom-made items
              </Text>
              <Text style={styles.restrictionItem}>
                • Perishable goods and food items
              </Text>
              <Text style={styles.restrictionItem}>
                • Intimate or sanitary goods
              </Text>
              <Text style={styles.restrictionItem}>
                • Digital downloads and software
              </Text>
              <Text style={styles.restrictionItem}>
                • Gift cards and vouchers
              </Text>
            </View>
          </View>

          {/* Damaged Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Damaged or Defective Items</Text>
            <Text style={styles.bodyText}>
              If you receive a damaged or defective item, please contact us
              immediately. We'll arrange for a replacement or full refund at no
              cost to you. Please include photos of the damage when reporting
              the issue.
            </Text>
          </View>

          {/* Contact Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Need Help?</Text>
            <Text style={styles.bodyText}>
              Our customer support team is here to help with any questions about
              returns or refunds.
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactSupport}
            >
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          {/* Last Updated */}
          <View style={styles.lastUpdated}>
            <Text style={styles.lastUpdatedText}>
              Last updated: January 2025
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#ffffff",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginTop: 32,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666666",
    textAlign: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  policyItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  policyContent: {
    flex: 1,
    justifyContent: "center",
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  policyDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
  },
  stepContainer: {
    marginTop: 4,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#1a1a1a",
  },
  restrictionsList: {
    marginTop: 8,
  },
  restrictionItem: {
    fontSize: 15,
    lineHeight: 24,
    color: "#666666",
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666666",
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  lastUpdated: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    alignItems: "center",
  },
  lastUpdatedText: {
    fontSize: 14,
    color: "#999999",
  },
});

export default RefundReturnScreen;
