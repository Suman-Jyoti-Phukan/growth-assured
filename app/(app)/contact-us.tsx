import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ContactUs(): JSX.Element {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>
          We'd love to hear from you! Reach out to us using the details below.
        </Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Ways to Reach Us</Text>

          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email:</Text>
            <Text style={styles.contactValue}>support@growthassured.com</Text>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Phone:</Text>
            <Text style={styles.contactValue}>+91 (555) 123-4567</Text>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Address:</Text>
            <Text style={styles.contactValue}>
              Rajbari Path , Ganeshguri City, State 12345
            </Text>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Business Hours:</Text>
            <Text style={styles.contactValue}>
              Monday - Friday: 9:00 AM - 6:00 PM{"\n"}
              Saturday: 10:00 AM - 4:00 PM{"\n"}
              Sunday: Closed
            </Text>
          </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  contactInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  contactItem: {
    marginBottom: 15,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
  },
});
