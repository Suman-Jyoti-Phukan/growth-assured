import React, { useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface AboutUsProps {}

export default function AboutUsComponent() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slideAnim = useRef(new Animated.Value(50)).current;

  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderAnimatedTitle = () => {
    const title = "A Legacy of Expertise, A Commitment to Your Security";
    return (
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.mainTitle}>{title}</Text>
      </Animated.View>
    );
  };

  const renderSection = (title: string, content: string, delay: number = 0) => {
    const sectionFadeAnim = useRef(new Animated.Value(0)).current;
    const sectionSlideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(sectionFadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(sectionSlideAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();
      }, delay);

      return () => clearTimeout(timer);
    }, []);

    return (
      <Animated.View
        style={[
          styles.sectionContainer,
          {
            opacity: sectionFadeAnim,
            transform: [{ translateY: sectionSlideAnim }],
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleLine} />
          <Text style={styles.sectionTitle}>{title}</Text>
          <View style={styles.sectionTitleLine} />
        </View>
        <Text style={styles.sectionContent}>{content}</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#f8fafc", "#e2e8f0", "#cbd5e1"]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.headerSection}>
            <Text style={styles.companyName}>
              Growth Assured Insurance Brokers
            </Text>
            {renderAnimatedTitle()}
          </View>

          <Animated.View
            style={[
              styles.aboutCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>About Us</Text>
              <View style={styles.decorativeLine} />
            </View>

            <Text style={styles.aboutText}>
              At Growth Assured Insurance Brokers, we are dedicated to helping
              individuals and families create a secure foundation for their
              financial well-being. With a deep understanding of the importance
              of financial protection, we go beyond the typical insurance
              experience by offering customized solutions that address the
              unique needs of each client.
            </Text>

            <Text style={styles.aboutText}>
              As an experienced and trusted insurance brokerage firm, we take
              pride in providing guidance that simplifies the often complex
              world of insurance. Whether it's protecting your health,
              safeguarding your home, ensuring your family's future, or
              preparing for life's uncertainties, we work closely with you to
              identify the best coverage options that align with your specific
              goals.
            </Text>
          </Animated.View>

          {renderSection(
            "Our Mission",
            "Our mission is to deliver exceptional life/Health/General insurance services, building long-lasting relationships with our clients through trust, transparency, and unparalleled expertise.",
            400
          )}

          {renderSection(
            "Our Vision",
            "To become the trusted leader in the Insurance brokerage industry, recognized for our commitment to excellence, innovation, and customer satisfaction.",
            800
          )}

          <Animated.View
            style={[
              styles.featuresContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.featureRow}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>🛡️</Text>
                </View>
                <Text style={styles.featureTitle}>Protection</Text>
                <Text style={styles.featureDescription}>
                  Comprehensive coverage for all your needs
                </Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>🤝</Text>
                </View>
                <Text style={styles.featureTitle}>Trust</Text>
                <Text style={styles.featureDescription}>
                  Building lasting relationships through transparency
                </Text>
              </View>
            </View>

            <View style={styles.featureRow}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>⚡</Text>
                </View>
                <Text style={styles.featureTitle}>Excellence</Text>
                <Text style={styles.featureDescription}>
                  Committed to delivering exceptional service
                </Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>🎯</Text>
                </View>
                <Text style={styles.featureTitle}>Innovation</Text>
                <Text style={styles.featureDescription}>
                  Leading the industry with innovative solutions
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  companyName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e40af",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  titleContainer: {
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  aboutCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
  },
  decorativeLine: {
    width: 50,
    height: 3,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4b5563",
    marginBottom: 16,
    textAlign: "justify",
  },
  sectionContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitleLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
    marginHorizontal: 16,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4b5563",
    textAlign: "justify",
  },
  featuresContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  featureItem: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 8,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
