import { DocumentUpload } from "@/app/(app)/policy-holder";

import { FontAwesome } from "@expo/vector-icons";

import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "./colors";

import { responsiveFontSize } from "react-native-responsive-dimensions";

interface ImagePreviewModalProps {
  visible: boolean;
  onClose: () => void;
  currentPreviewImage: DocumentUpload | null;
  currentPreviewName: string;
  documentVerification: Record<string, boolean | undefined>;
  pickImage: (documentName: string) => void;
  verifyDocument: (documentName: string) => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  visible,
  onClose,
  currentPreviewImage,
  currentPreviewName,
  documentVerification,
  pickImage,
  verifyDocument,
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={imagePreviewStyles.previewModalOverlay}>
      <View style={imagePreviewStyles.previewModalContainer}>
        <View style={imagePreviewStyles.previewModalHeader}>
          <Text style={imagePreviewStyles.previewModalTitle}>
            {currentPreviewName}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={imagePreviewStyles.closeButton}
          >
            <FontAwesome name="times" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        {currentPreviewImage && (
          <View style={imagePreviewStyles.previewImageContainer}>
            <Image
              source={{ uri: currentPreviewImage.uri }}
              style={imagePreviewStyles.previewImage}
              resizeMode="contain"
            />
          </View>
        )}
        <View style={imagePreviewStyles.previewModalActions}>
          <TouchableOpacity
            style={[
              imagePreviewStyles.previewModalButton,
              { backgroundColor: COLORS.secondary },
            ]}
            onPress={() => currentPreviewName && pickImage(currentPreviewName)}
          >
            <FontAwesome
              name="refresh"
              size={16}
              color={COLORS.primary}
              style={imagePreviewStyles.buttonIcon}
            />
            <Text
              style={[
                imagePreviewStyles.previewModalButtonText,
                { color: COLORS.primary },
              ]}
            >
              Replace
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              imagePreviewStyles.previewModalButton,
              {
                backgroundColor: documentVerification[currentPreviewName]
                  ? COLORS.success
                  : COLORS.primary,
              },
            ]}
            onPress={() => {
              if (
                currentPreviewName &&
                !documentVerification[currentPreviewName]
              ) {
                verifyDocument(currentPreviewName);
              }
            }}
            disabled={documentVerification[currentPreviewName]}
          >
            <FontAwesome
              name={
                documentVerification[currentPreviewName] ? "check" : "shield"
              }
              size={16}
              color="#FFF"
              style={imagePreviewStyles.buttonIcon}
            />
            <Text style={imagePreviewStyles.previewModalButtonText}>
              {documentVerification[currentPreviewName] ? "Verified" : "Verify"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const imagePreviewStyles = StyleSheet.create({
  previewModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewModalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    width: "90%",
    maxHeight: "80%",
    overflow: "hidden",
  },
  previewModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  previewModalTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: COLORS.text,
  },
  closeButton: { padding: 5 },
  previewImageContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  previewImage: { width: "100%", height: "100%" },
  previewModalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  previewModalButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  previewModalButtonText: {
    fontWeight: "600",
    fontSize: responsiveFontSize(1.7),
    color: "#FFFFFF",
  },
  buttonIcon: { marginRight: 8 },
});
