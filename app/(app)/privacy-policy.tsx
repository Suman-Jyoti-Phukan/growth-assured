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

const PrivacyPolicyScreen = () => {
  const handleContactPress = () => {
    console.log("Contact pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.introText}>
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information when you use
              our services.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information We Collect</Text>

            <View style={styles.subsection}>
              <View style={styles.iconRow}>
                <Text style={styles.icon}>👤</Text>
                <Text style={styles.subsectionTitle}>Personal Information</Text>
              </View>
              <Text style={styles.bodyText}>
                We collect information you provide directly, such as your name,
                email address, phone number, and billing information when you
                create an account or make a purchase.
              </Text>
            </View>

            <View style={styles.subsection}>
              <View style={styles.iconRow}>
                <Text style={styles.icon}>📱</Text>
                <Text style={styles.subsectionTitle}>Device Information</Text>
              </View>
              <Text style={styles.bodyText}>
                We automatically collect device information including IP
                address, browser type, operating system, and unique device
                identifiers to improve our services.
              </Text>
            </View>

            <View style={styles.subsection}>
              <View style={styles.iconRow}>
                <Text style={styles.icon}>📊</Text>
                <Text style={styles.subsectionTitle}>Usage Data</Text>
              </View>
              <Text style={styles.bodyText}>
                We collect information about how you interact with our app,
                including features used, pages visited, and time spent in the
                application.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How We Use Your Information</Text>
            <View style={styles.usageList}>
              <View style={styles.usageItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.usageText}>
                  Provide and maintain our services
                </Text>
              </View>
              <View style={styles.usageItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.usageText}>
                  Process transactions and send confirmations
                </Text>
              </View>
              <View style={styles.usageItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.usageText}>
                  Send important updates and notifications
                </Text>
              </View>
              <View style={styles.usageItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.usageText}>
                  Improve our products and user experience
                </Text>
              </View>
              <View style={styles.usageItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.usageText}>
                  Provide customer support and assistance
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Protection</Text>
            <View style={styles.protectionGrid}>
              <View style={styles.protectionItem}>
                <Text style={styles.protectionIcon}>🔐</Text>
                <Text style={styles.protectionTitle}>Encryption</Text>
                <Text style={styles.protectionDescription}>
                  All data is encrypted in transit and at rest
                </Text>
              </View>
              <View style={styles.protectionItem}>
                <Text style={styles.protectionIcon}>🛡️</Text>
                <Text style={styles.protectionTitle}>Secure Servers</Text>
                <Text style={styles.protectionDescription}>
                  Data stored on secure, monitored servers
                </Text>
              </View>
              <View style={styles.protectionItem}>
                <Text style={styles.protectionIcon}>🔒</Text>
                <Text style={styles.protectionTitle}>Access Control</Text>
                <Text style={styles.protectionDescription}>
                  Strict access controls and authentication
                </Text>
              </View>
              <View style={styles.protectionItem}>
                <Text style={styles.protectionIcon}>👥</Text>
                <Text style={styles.protectionTitle}>Team Training</Text>
                <Text style={styles.protectionDescription}>
                  Regular security training for all staff
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information Sharing</Text>
            <View style={styles.highlightBox}>
              <Text style={styles.highlightText}>
                We do not sell, trade, or rent your personal information to
                third parties.
              </Text>
            </View>
            <Text style={styles.bodyText}>
              We may share your information only in the following circumstances:
            </Text>
            <View style={styles.sharingList}>
              <Text style={styles.sharingItem}>
                • With your explicit consent
              </Text>
              <Text style={styles.sharingItem}>
                • To comply with legal requirements
              </Text>
              <Text style={styles.sharingItem}>
                • With trusted service providers who assist our operations
              </Text>
              <Text style={styles.sharingItem}>
                • In case of business merger or acquisition
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Rights</Text>
            <View style={styles.rightsContainer}>
              <View style={styles.rightItem}>
                <Text style={styles.rightTitle}>Access & Portability</Text>
                <Text style={styles.rightDescription}>
                  Request a copy of your personal data in a portable format
                </Text>
              </View>
              <View style={styles.rightItem}>
                <Text style={styles.rightTitle}>Correction</Text>
                <Text style={styles.rightDescription}>
                  Update or correct inaccurate personal information
                </Text>
              </View>
              <View style={styles.rightItem}>
                <Text style={styles.rightTitle}>Deletion</Text>
                <Text style={styles.rightDescription}>
                  Request deletion of your personal data (subject to legal
                  requirements)
                </Text>
              </View>
              <View style={styles.rightItem}>
                <Text style={styles.rightTitle}>Opt-out</Text>
                <Text style={styles.rightDescription}>
                  Unsubscribe from marketing communications at any time
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <Text style={styles.bodyText}>
              If you have any questions about this Privacy Policy or how we
              handle your data, please don't hesitate to contact us.
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactPress}
            >
              <Text style={styles.contactButtonText}>Contact Privacy Team</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.lastUpdated}>
            <Text style={styles.lastUpdatedText}>
              Last updated: January 2025
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  subsection: {
    marginBottom: 24,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666666",
    marginBottom: 16,
  },
  usageList: {
    marginTop: 8,
  },
  usageItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#007AFF",
    marginRight: 12,
    marginTop: 8,
  },
  usageText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#666666",
  },
  protectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  protectionItem: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  protectionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  protectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 4,
  },
  protectionDescription: {
    fontSize: 12,
    lineHeight: 16,
    color: "#666666",
    textAlign: "center",
  },
  highlightBox: {
    backgroundColor: "#e3f2fd",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  highlightText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
  },
  sharingList: {
    marginTop: 8,
  },
  sharingItem: {
    fontSize: 15,
    lineHeight: 24,
    color: "#666666",
    marginBottom: 4,
  },
  rightsContainer: {
    marginTop: 8,
  },
  rightItem: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#28a745",
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  rightDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
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

export default PrivacyPolicyScreen;
