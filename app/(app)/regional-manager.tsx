import { View, Text, StyleSheet, Pressable } from "react-native";

import { organization } from "@/utils/fakeData";

import { useNavigation } from "expo-router";

import { themeColors } from "@/utils/colors";

import { router } from "expo-router";

import { useAuth } from "@/context/AuthContext";

export default function Heirarchy() {
  const { userData, accessToken } = useAuth();

  console.log("Access Token", accessToken, "User Data", userData);

  return (
    <View style={styles.container}>
      {organization.areaSalesManagers.map((asm) => (
        <Pressable
          key={asm.name}
          style={styles.card}
          // onPress={() => {
          //   router.push({
          //     pathname: "/(hierarchy)/employee-details",
          //     params: {
          //       data: JSON.stringify(asm),
          //     },
          //   });
          // }}
        >
          <Text style={styles.name}>{asm.name}</Text>

          <Text style={styles.role}>{asm.role}</Text>

          <Text style={styles.contact}>📞 +91 98765 43210</Text>

          <Text style={styles.contact}>✉️ asm@example.com</Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.9 },
              ]}
              onPress={(e) => {
                e.stopPropagation();
                router.push("/(hierarchy)/branch-manager" as never);
              }}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.9 },
              ]}
              onPress={(e) => {
                e.stopPropagation();
                router.push("/(hierarchy)/login-report" as never);
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.9 },
              ]}
              onPress={(e) => {
                e.stopPropagation();
                router.push("/(hierarchy)/dsr-report" as never);
              }}
            >
              <Text style={styles.buttonText}>DSR Report</Text>
            </Pressable>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f2f4f7",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1f2937",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: themeColors.primary,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  contact: {
    fontSize: 14,
    color: "#374151",
    marginVertical: 6,
  },
  button: {
    backgroundColor: themeColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
