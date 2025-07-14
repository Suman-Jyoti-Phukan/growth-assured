import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  isLast?: boolean;
};

import { ReactNode } from "react";

const Profile = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    router.push("/edit-profile");
  };

  const InfoCard = ({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) => (
    <View style={styles.infoCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );

  const InfoRow = ({ icon, label, value, isLast = false }: InfoRowProps) => (
    <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={20} color="#6366F1" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        <Text style={styles.designation}>Senior Software Engineer</Text>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="#6366F1" />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Personal Information */}
      <InfoCard title="Personal Information">
        <InfoRow icon="person-outline" label="Employee ID" value="EMP001" />
        <InfoRow icon="call-outline" label="Phone" value="+1 (555) 123-4567" />
        <InfoRow
          icon="location-outline"
          label="Address"
          value="123 Main St, City, State"
        />
        <InfoRow
          icon="calendar-outline"
          label="Date of Birth"
          value="January 15, 1990"
          isLast
        />
      </InfoCard>

      {/* Bank Details */}
      <InfoCard title="Bank Details">
        <InfoRow icon="card-outline" label="Account Holder" value="John Doe" />
        <InfoRow icon="business-outline" label="Bank Name" value="Chase Bank" />
        <InfoRow
          icon="keypad-outline"
          label="Account Number"
          value="****-****-1234"
        />
        <InfoRow icon="copy-outline" label="IFSC CODE" value="021000021" />
        <InfoRow
          icon="wallet-outline"
          label="MICR"
          value="HIMUBURI225"
          isLast
        />
      </InfoCard>

      {/* Employment Details */}
      <InfoCard title="Employment Details">
        <InfoRow
          icon="briefcase-outline"
          label="Department"
          value="Engineering"
        />
        <InfoRow icon="time-outline" label="Join Date" value="March 15, 2022" />
        <InfoRow
          icon="trending-up-outline"
          label="Experience"
          value="5 years"
        />
        <InfoRow
          icon="star-outline"
          label="Employee Type"
          value="Full-time"
          isLast
        />
      </InfoCard>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="settings-outline" size={20} color="#6B7280" />
          <Text style={styles.secondaryButtonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FFF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#E5E7EB",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#6366F1",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  name: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: responsiveFontSize(2),
    color: "#6B7280",
    marginBottom: 4,
  },
  designation: {
    fontSize: responsiveFontSize(1.8),
    color: "#6366F1",
    fontWeight: "600",
    marginBottom: 20,
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  editProfileText: {
    color: "#6366F1",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: responsiveFontSize(1.9),
    color: "#6B7280",
    marginLeft: 12,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: responsiveFontSize(1.9),
    color: "#111827",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  secondaryButtonText: {
    color: "#6B7280",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    marginLeft: 8,
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 30,
  },
});
