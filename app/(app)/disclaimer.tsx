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

const DisclaimerScreen = () => {
  const handleBackPress = () => {
    // Handle back navigation
    console.log("Back pressed");
  };

  const handleContactPress = () => {
    // Handle contact
    console.log("Contact pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Disclaimer</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.warningBox}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Please read this disclaimer carefully before using our services
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General Information</Text>
            <Text style={styles.bodyText}>
              The information contained in this mobile application is for
              general information purposes only. While we strive to keep the
              information up-to-date and accurate, we make no representations or
              warranties of any kind, express or implied, about the
              completeness, accuracy, reliability, suitability, or availability
              of the information, products, services, or related graphics
              contained in the app.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Limitations</Text>

            <View style={styles.limitationItem}>
              <View style={styles.limitationIcon}>
                <Text style={styles.iconText}>🎯</Text>
              </View>
              <View style={styles.limitationContent}>
                <Text style={styles.limitationTitle}>Accuracy</Text>
                <Text style={styles.limitationDescription}>
                  Information provided may not always be 100% accurate or
                  current. We recommend verifying critical information
                  independently.
                </Text>
              </View>
            </View>

            <View style={styles.limitationItem}>
              <View style={styles.limitationIcon}>
                <Text style={styles.iconText}>🔄</Text>
              </View>
              <View style={styles.limitationContent}>
                <Text style={styles.limitationTitle}>Availability</Text>
                <Text style={styles.limitationDescription}>
                  Services may be interrupted, suspended, or unavailable due to
                  maintenance, technical issues, or other factors beyond our
                  control.
                </Text>
              </View>
            </View>

            <View style={styles.limitationItem}>
              <View style={styles.limitationIcon}>
                <Text style={styles.iconText}>📱</Text>
              </View>
              <View style={styles.limitationContent}>
                <Text style={styles.limitationTitle}>Device Compatibility</Text>
                <Text style={styles.limitationDescription}>
                  App functionality may vary across different devices and
                  operating systems. We cannot guarantee optimal performance on
                  all platforms.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Limitation of Liability</Text>
            <View style={styles.liabilityBox}>
              <Text style={styles.liabilityText}>
                In no event shall our company, its directors, employees, or
                agents be liable for any direct, indirect, incidental, special,
                consequential, or punitive damages arising out of your use of
                this application.
              </Text>
            </View>
            <View style={styles.liabilityList}>
              <Text style={styles.liabilityItem}>
                • Loss of data or information
              </Text>
              <Text style={styles.liabilityItem}>
                • Business interruption or loss of profits
              </Text>
              <Text style={styles.liabilityItem}>
                • Personal injury or property damage
              </Text>
              <Text style={styles.liabilityItem}>
                • Unauthorized access to your device
              </Text>
              <Text style={styles.liabilityItem}>
                • Errors or omissions in content
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Third-Party Content</Text>
            <View style={styles.thirdPartyContainer}>
              <View style={styles.thirdPartyItem}>
                <Text style={styles.thirdPartyIcon}>🔗</Text>
                <View style={styles.thirdPartyContent}>
                  <Text style={styles.thirdPartyTitle}>External Links</Text>
                  <Text style={styles.thirdPartyDescription}>
                    Links to external websites are provided for convenience
                    only. We are not responsible for their content or privacy
                    practices.
                  </Text>
                </View>
              </View>
              <View style={styles.thirdPartyItem}>
                <Text style={styles.thirdPartyIcon}>🔌</Text>
                <View style={styles.thirdPartyContent}>
                  <Text style={styles.thirdPartyTitle}>Integrations</Text>
                  <Text style={styles.thirdPartyDescription}>
                    Third-party services and integrations are subject to their
                    own terms and conditions.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Advice</Text>
            <View style={styles.adviceBox}>
              <Text style={styles.adviceIcon}>👨‍⚕️</Text>
              <Text style={styles.adviceTitle}>Not Professional Advice</Text>
              <Text style={styles.adviceText}>
                The information provided in this app is not intended as
                professional advice. For specific concerns or decisions, please
                consult with qualified professionals in the relevant field.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Responsibility</Text>
            <View style={styles.responsibilityContainer}>
              <View style={styles.responsibilityItem}>
                <View style={styles.responsibilityNumber}>
                  <Text style={styles.responsibilityNumberText}>1</Text>
                </View>
                <Text style={styles.responsibilityText}>
                  Use the app at your own risk and discretion
                </Text>
              </View>
              <View style={styles.responsibilityItem}>
                <View style={styles.responsibilityNumber}>
                  <Text style={styles.responsibilityNumberText}>2</Text>
                </View>
                <Text style={styles.responsibilityText}>
                  Verify important information through independent sources
                </Text>
              </View>
              <View style={styles.responsibilityItem}>
                <View style={styles.responsibilityNumber}>
                  <Text style={styles.responsibilityNumberText}>3</Text>
                </View>
                <Text style={styles.responsibilityText}>
                  Report any issues or concerns promptly to our support team
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Changes to This Disclaimer</Text>
            <Text style={styles.bodyText}>
              We reserve the right to modify this disclaimer at any time.
              Changes will be effective immediately upon posting in the app.
              Your continued use of the app constitutes acceptance of any
              changes.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Questions or Concerns</Text>
            <Text style={styles.bodyText}>
              If you have any questions about this disclaimer or need
              clarification on any of the points mentioned, please contact our
              support team.
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactPress}
            >
              <Text style={styles.contactButtonText}>Contact Support</Text>
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
  warningBox: {
    backgroundColor: "#fff3cd",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ffc107",
    flexDirection: "row",
    alignItems: "center",
  },
  warningIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#856404",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666666",
    marginBottom: 16,
  },
  limitationItem: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
  },
  limitationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 18,
  },
  limitationContent: {
    flex: 1,
  },
  limitationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  limitationDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
  },
  liabilityBox: {
    backgroundColor: "#f8d7da",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#dc3545",
    marginBottom: 16,
  },
  liabilityText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#721c24",
    fontWeight: "500",
  },
  liabilityList: {
    marginTop: 8,
  },
  liabilityItem: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666666",
    marginBottom: 4,
  },
  thirdPartyContainer: {
    marginTop: 8,
  },
  thirdPartyItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#e8f4f8",
    padding: 16,
    borderRadius: 12,
  },
  thirdPartyIcon: {
    fontSize: 20,
    marginRight: 16,
    marginTop: 2,
  },
  thirdPartyContent: {
    flex: 1,
  },
  thirdPartyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  thirdPartyDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
  },
  adviceBox: {
    backgroundColor: "#d4edda",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#28a745",
    alignItems: "center",
    textAlign: "center",
  },
  adviceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  adviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#155724",
    marginBottom: 8,
  },
  adviceText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#155724",
    textAlign: "center",
  },
  responsibilityContainer: {
    marginTop: 8,
  },
  responsibilityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  responsibilityNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6c757d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 2,
  },
  responsibilityNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  responsibilityText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#1a1a1a",
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

export default DisclaimerScreen;
