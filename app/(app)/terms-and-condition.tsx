import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

export default function TermsAndCondition() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.lastUpdated}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By downloading, installing, or using this mobile application
            ("App"), you agree to be bound by these Terms and Conditions
            ("Terms"). If you do not agree to these Terms, please do not use the
            App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use of the App</Text>
          <Text style={styles.text}>
            You may use this App for lawful purposes only. You agree not to use
            the App:
          </Text>
          <Text style={styles.bulletPoint}>
            • In any way that violates applicable laws or regulations
          </Text>
          <Text style={styles.bulletPoint}>
            • To transmit harmful, offensive, or inappropriate content
          </Text>
          <Text style={styles.bulletPoint}>
            • To interfere with or disrupt the App's functionality
          </Text>
          <Text style={styles.bulletPoint}>
            • To attempt unauthorized access to our systems
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Accounts</Text>
          <Text style={styles.text}>
            You are responsible for maintaining the confidentiality of your
            account credentials. You agree to notify us immediately of any
            unauthorized use of your account. We are not liable for any loss or
            damage arising from your failure to protect your account
            information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
          <Text style={styles.text}>
            Your privacy is important to us. Please review our Privacy Policy,
            which explains how we collect, use, and protect your information
            when you use our App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            5. Content and Intellectual Property
          </Text>
          <Text style={styles.text}>
            The App and its original content, features, and functionality are
            owned by us and are protected by international copyright, trademark,
            and other intellectual property laws. You may not modify,
            distribute, or create derivative works based on the App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. User-Generated Content</Text>
          <Text style={styles.text}>
            You retain ownership of content you create or upload through the
            App. However, by using the App, you grant us a non-exclusive,
            royalty-free license to use, modify, and display your content as
            necessary to provide our services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Disclaimers</Text>
          <Text style={styles.text}>
            The App is provided "as is" without warranties of any kind. We do
            not guarantee that the App will be uninterrupted, error-free, or
            free from harmful components. Your use of the App is at your own
            risk.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
          <Text style={styles.text}>
            To the fullest extent permitted by law, we shall not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages arising from your use of the App, even if we have been
            advised of the possibility of such damages.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Termination</Text>
          <Text style={styles.text}>
            We may terminate or suspend your access to the App at any time, with
            or without cause, and with or without notice. Upon termination, your
            right to use the App will cease immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Changes to Terms</Text>
          <Text style={styles.text}>
            We reserve the right to modify these Terms at any time. We will
            notify users of any material changes by updating the "Last updated"
            date. Your continued use of the App after changes constitutes
            acceptance of the new Terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Governing Law</Text>
          <Text style={styles.text}>
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law provisions. Any disputes arising from these Terms will be
            resolved in the courts of [Your Jurisdiction].
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Contact Information</Text>
          <Text style={styles.text}>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: growthassured@mail.com</Text>
          <Text style={styles.contactInfo}>Address: Guwahati , Assam.</Text>
          <Text style={styles.contactInfo}>Phone: 6901471920</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using this App, you acknowledge that you have read, understood,
            and agree to be bound by these Terms and Conditions.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
  },
  lastUpdated: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 30,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444444",
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444444",
    marginLeft: 10,
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444444",
    marginLeft: 10,
    marginBottom: 5,
  },
  footer: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
});
