import { DocumentUpload } from "@/app/(app)/policy-holder";

import { FontAwesome } from "@expo/vector-icons";

import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "./colors";

import { responsiveFontSize } from "react-native-responsive-dimensions";

type IconMap = {
  [key: string]: string;
};

const documentIcons: IconMap = {
  Pan: "id-card",
  "Aadhar Card": "address-card",
  "Cancelled Cheque or Passbook Front Page": "bank",
  Photo: "camera",
};

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCategory: string;
  selectedSubcategory: string;
  formValues: Record<string, string>;
  documentImages: Record<string, DocumentUpload | undefined>;
  documentVerification: Record<string, boolean | undefined>;
  onSubmit: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  onClose,
  selectedCategory,
  selectedSubcategory,
  formValues,
  documentImages,
  documentVerification,
  onSubmit,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={reviewStyles.modalOverlay}>
      <View style={[reviewStyles.modalContainer, { maxHeight: "90%" }]}>
        <View style={reviewStyles.modalHeader}>
          <Text style={reviewStyles.modalTitle}>Review Your Application</Text>
          <TouchableOpacity onPress={onClose} style={reviewStyles.closeButton}>
            <FontAwesome name="times" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={reviewStyles.reviewContent}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={reviewStyles.reviewSection}>
            <Text style={reviewStyles.reviewSectionTitle}>
              Policy Information
            </Text>
            <View style={reviewStyles.reviewItem}>
              <Text style={reviewStyles.reviewItemLabel}>Category:</Text>
              <Text style={reviewStyles.reviewItemValue}>
                {selectedCategory}
              </Text>
            </View>
            <View style={reviewStyles.reviewItem}>
              <Text style={reviewStyles.reviewItemLabel}>Subcategory:</Text>
              <Text style={reviewStyles.reviewItemValue}>
                {selectedSubcategory}
              </Text>
            </View>
          </View>
          <View style={reviewStyles.reviewSection}>
            <Text style={reviewStyles.reviewSectionTitle}>
              Personal Details
            </Text>
            {Object.keys(formValues).map((key, index) => (
              <View key={index} style={reviewStyles.reviewItem}>
                <Text style={reviewStyles.reviewItemLabel}>{key}:</Text>
                <Text style={reviewStyles.reviewItemValue}>
                  {formValues[key] || "Not provided"}
                </Text>
              </View>
            ))}
          </View>
          <View style={reviewStyles.reviewSection}>
            <Text style={reviewStyles.reviewSectionTitle}>Documents</Text>
            {Object.keys(documentIcons).map((doc, index) => (
              <View key={index} style={reviewStyles.reviewItem}>
                <Text style={reviewStyles.reviewItemLabel}>{doc}:</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={reviewStyles.reviewItemValue}>
                    {documentImages[doc] ? "Uploaded" : "Missing"}
                  </Text>
                  {documentImages[doc] && (
                    <>
                      <Image
                        source={{ uri: documentImages[doc]?.uri }}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 8,
                          marginLeft: 10,
                        }}
                        resizeMode="cover"
                      />
                      <View
                        style={{
                          marginLeft: 10,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome
                          name={
                            documentVerification[doc]
                              ? "check-circle"
                              : "circle-o"
                          }
                          size={14}
                          color={
                            documentVerification[doc]
                              ? COLORS.success
                              : COLORS.lightText
                          }
                        />
                        <Text
                          style={{
                            marginLeft: 5,
                            color: documentVerification[doc]
                              ? COLORS.success
                              : COLORS.lightText,
                            fontSize: responsiveFontSize(1.6),
                          }}
                        >
                          {documentVerification[doc]
                            ? "Verified"
                            : "Unverified"}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>

          <View style={reviewStyles.reviewDisclaimer}>
            <FontAwesome
              name="info-circle"
              size={16}
              color={COLORS.lightText}
            />
            <Text style={reviewStyles.reviewDisclaimerText}>
              By submitting this application, you confirm that all information
              provided is accurate and complete.
            </Text>
          </View>
        </ScrollView>

        <View style={reviewStyles.reviewActions}>
          <TouchableOpacity
            style={[
              reviewStyles.reviewActionButton,
              { backgroundColor: COLORS.secondary },
            ]}
            onPress={onClose}
          >
            <Text
              style={[
                reviewStyles.reviewActionButtonText,
                { color: COLORS.primary },
              ]}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              reviewStyles.reviewActionButton,
              { backgroundColor: COLORS.primary },
            ]}
            onPress={onSubmit}
          >
            <Text style={reviewStyles.reviewActionButtonText}>
              Confirm & Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const reviewStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: COLORS.text,
  },
  closeButton: { padding: 5 },
  reviewContent: { padding: 20 },
  reviewSection: { marginBottom: 20 },
  reviewSectionTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },
  reviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    paddingBottom: 0,
    minHeight: 70,
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewItemLabel: {
    fontSize: responsiveFontSize(1.7),
    color: COLORS.lightText,
    flex: 1,
  },
  reviewItemValue: {
    fontSize: responsiveFontSize(1.7),
    color: COLORS.text,
    fontWeight: "500",
    flex: 1.5,
    textAlign: "right",
  },
  reviewDisclaimer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "flex-start",
  },
  reviewDisclaimerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: responsiveFontSize(1.5),
    color: COLORS.lightText,
  },
  reviewActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  reviewActionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  reviewActionButtonText: {
    fontWeight: "600",
    fontSize: responsiveFontSize(1.8),
    color: "#FFFFFF",
  },
});
