import { responsiveFontSize } from "react-native-responsive-dimensions";

import { COLORS } from "./colors";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

interface DocumentUpload {
  uri: string;
  name: string;
  type: string;
}

type IconMap = {
  [key: string]: string;
};

const documentIcons: IconMap = {
  Pan: "id-card",
  "Aadhar Card": "address-card",
  "Cancelled Cheque or Passbook Front Page": "bank",
  Photo: "camera",
};

interface DocumentsPhaseProps {
  documentImages: Record<string, DocumentUpload | undefined>;
  documentVerification: Record<string, boolean | undefined>;
  pickImage: (documentName: string) => void;
  previewDocument: (documentName: string) => void;
}

export const DocumentsPhase: React.FC<DocumentsPhaseProps> = ({
  documentImages,
  documentVerification,
  pickImage,
  previewDocument,
}) => (
  <View style={documentsStyles.documentsSection}>
    <Text style={documentsStyles.documentsSectionTitle}>
      Required Documents
    </Text>
    <Text style={documentsStyles.documentsSectionSubtitle}>
      All documents must be uploaded before submission
    </Text>
    {Object.keys(documentIcons).map((doc, index) => (
      <View key={index} style={documentsStyles.documentItem}>
        <View style={documentsStyles.documentIconContainer}>
          <FontAwesome
            name={
              documentIcons[doc] as
                | "id-card"
                | "address-card"
                | "bank"
                | "camera"
                | undefined
            }
            size={16}
            color={COLORS.primary}
          />
        </View>
        <View style={documentsStyles.documentInfoContainer}>
          <Text style={documentsStyles.documentText}>{doc}</Text>
          {documentImages[doc] && (
            <View style={documentsStyles.documentStatusContainer}>
              <FontAwesome
                name={documentVerification[doc] ? "check-circle" : "clock-o"}
                size={12}
                color={
                  documentVerification[doc] ? COLORS.success : COLORS.lightText
                }
              />
              <Text
                style={[
                  documentsStyles.documentStatusText,
                  {
                    color: documentVerification[doc]
                      ? COLORS.success
                      : COLORS.lightText,
                  },
                ]}
              >
                {documentVerification[doc]
                  ? "Verified"
                  : "Pending verification"}
              </Text>
            </View>
          )}
        </View>
        <View style={documentsStyles.documentActions}>
          {documentImages[doc] ? (
            <>
              <TouchableOpacity
                style={documentsStyles.documentActionButton}
                onPress={() => previewDocument(doc)}
              >
                <FontAwesome name="eye" size={16} color={COLORS.primary} />
              </TouchableOpacity>
              <View style={documentsStyles.documentActionDivider} />
              <TouchableOpacity
                style={documentsStyles.documentActionButton}
                onPress={() => pickImage(doc)}
              >
                <FontAwesome name="refresh" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={documentsStyles.documentUploadButton}
              onPress={() => pickImage(doc)}
            >
              <FontAwesome name="upload" size={14} color={COLORS.primary} />
              <Text style={documentsStyles.documentUploadText}>Upload</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    ))}
    <View style={documentsStyles.documentsHelp}>
      <FontAwesome name="info-circle" size={14} color={COLORS.lightText} />
      <Text style={documentsStyles.documentsHelpText}>
        All documents must be clearly visible and in JPG, PNG or PDF format
      </Text>
    </View>
  </View>
);

const documentsStyles = StyleSheet.create({
  documentsSection: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  documentsSectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  documentsSectionSubtitle: {
    fontSize: responsiveFontSize(1.6),
    color: COLORS.lightText,
    marginBottom: 20,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginBottom: 12,
    padding: 15,
  },
  documentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  documentInfoContainer: { flex: 1, marginLeft: 15 },
  documentText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.text,
    fontWeight: "500",
  },
  documentStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  documentStatusText: { marginLeft: 5, fontSize: responsiveFontSize(1.4) },
  documentActions: { flexDirection: "row", alignItems: "center" },
  documentActionButton: { padding: 8 },
  documentActionDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
    marginHorizontal: 5,
  },
  documentUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  documentUploadText: {
    color: COLORS.primary,
    marginLeft: 5,
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
  },
  documentsHelp: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  documentsHelpText: {
    color: COLORS.lightText,
    fontSize: responsiveFontSize(1.5),
    marginLeft: 5,
  },
});
