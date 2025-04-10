import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import * as ImagePicker from "expo-image-picker";

const COLORS = {
  primary: "#5B67CA",
  secondary: "#F1F5FF",
  accent: "#FF8F6C",
  background: "#FFFFFF",
  text: "#333340",
  lightText: "#9A9AB0",
  border: "#E5E7EB",
  error: "#FF4D4F",
  success: "#4BB543",
  inputBg: "#F9FAFC",
  cardBg: "#FFFFFF",
};

const { width } = Dimensions.get("window");

const icons = {
  Name: "user",
  DOB: "calendar",
  "Mob No": "phone",
  "E-Mail Id": "envelope",
  "Identification mark": "id-card",
  "Father's Name": "male",
  "Mother's Name": "female",
  "Address as per Proof": "home",
  Landmark: "map-marker",
  Height: "arrows-v",
  Weight: "balance-scale",
  "Place of Birth": "map",
  "Education Qualification": "graduation-cap",
  "Nominee Name": "user-plus",
  "Nominee DOB": "calendar-check-o",
  Relationship: "handshake-o",
  "Name of Organisation": "building",
  "Type of Organisation": "industry",
  Designation: "id-badge",
  "Workplace City": "city",
  "Annual CTC/Income": "money",
  "Existing Insurance Cover": "shield",
};

const documentIcons = {
  Pan: "id-card",
  "Aadhar Card": "address-card",
  "Cancelled Cheque or Passbook Front Page": "bank",
  Photo: "camera",
};

const policyCategories = [
  "Automobile Insurance",
  "Health Insurance",
  "Life Insurance",
  "Home Insurance",
  "Travel Insurance",
  "Business Insurance",
];

const policySubcategories = {
  "Automobile Insurance": [
    "Automobile Type-1 (Two-Wheeler)",
    "Automobile Type-2 (Four-Wheeler)",
    "Automobile Type-3 (Commercial)",
    "Automobile Type-4 (Electric)",
  ],
  "Health Insurance": [
    "Health Type-1 (Individual)",
    "Health Type-2 (Family)",
    "Health Type-3 (Senior Citizen)",
    "Health Type-4 (Critical Illness)",
  ],
  "Life Insurance": [
    "Life Type-1 (Term)",
    "Life Type-2 (Whole Life)",
    "Life Type-3 (Endowment)",
    "Life Type-4 (ULIP)",
  ],
  "Home Insurance": [
    "Home Type-1 (Structure)",
    "Home Type-2 (Contents)",
    "Home Type-3 (Comprehensive)",
    "Home Type-4 (Landlord)",
  ],
  "Travel Insurance": [
    "Travel Type-1 (Domestic)",
    "Travel Type-2 (International)",
    "Travel Type-3 (Multi-trip)",
    "Travel Type-4 (Cruise)",
  ],
  "Business Insurance": [
    "Business Type-1 (Property)",
    "Business Type-2 (Liability)",
    "Business Type-3 (Workers Comp)",
    "Business Type-4 (Professional)",
  ],
};

interface DocumentUpload {
  uri: string;
  name: string;
  type: string;
}

//SUMAN -> Seperate the file into components and screens
export default function PolicyHolderScreen() {
  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof policySubcategories | ""
  >("");

  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);

  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const [documentImages, setDocumentImages] = useState<
    Record<string, DocumentUpload | null>
  >({});

  const [imagePreviewModal, setImagePreviewModal] = useState(false);

  const [currentPreviewImage, setCurrentPreviewImage] =
    useState<DocumentUpload | null>(null);

  const [currentPreviewName, setCurrentPreviewName] = useState("");

  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const [documentVerification, setDocumentVerification] = useState<
    Record<string, boolean>
  >({});

  const availableSubcategories = selectedCategory
    ? policySubcategories[
        selectedCategory as keyof typeof policySubcategories
      ] || []
    : [];

  const updateFormValue = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const pickImage = async (documentName: string) => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to upload documents."
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];

        const documentUpload: DocumentUpload = {
          uri: selectedImage.uri,
          name: documentName.replace(/\s+/g, "_").toLowerCase() + ".jpg",
          type: "image/jpeg",
        };

        setDocumentImages((prev) => ({
          ...prev,
          [documentName]: documentUpload,
        }));

        setDocumentVerification((prev) => ({
          ...prev,
          [documentName]: false,
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "There was an error selecting the image. Please try again."
      );
    }
  };

  const verifyDocument = (documentName: string) => {
    setTimeout(() => {
      setDocumentVerification((prev) => ({
        ...prev,
        [documentName]: true,
      }));

      Alert.alert(
        "Document Verified",
        `${documentName} has been successfully verified.`,
        [{ text: "OK", onPress: () => setImagePreviewModal(false) }]
      );
    }, 1500);
  };

  const previewDocument = (documentName: string) => {
    const document = documentImages[documentName];
    if (document) {
      setCurrentPreviewImage(document);
      setCurrentPreviewName(documentName);
      setImagePreviewModal(true);
    }
  };

  const areAllDocumentsUploaded = () => {
    return Object.keys(documentIcons).every(
      (doc) => documentImages[doc] !== undefined
    );
  };

  const areRequiredFieldsFilled = () => {
    const requiredFields = [
      "Name",
      "DOB",
      "Mob No",
      "E-Mail Id",
      "Father's Name",
      "Mother's Name",
      "Address as per Proof",
    ];
    return requiredFields.every(
      (field) => formValues[field] && formValues[field].trim() !== ""
    );
  };

  const handleReview = () => {
    if (!selectedCategory || !selectedSubcategory) {
      Alert.alert(
        "Incomplete Form",
        "Please select policy category and subcategory."
      );
      return;
    }

    if (!areRequiredFieldsFilled()) {
      Alert.alert(
        "Incomplete Form",
        "Please fill in all required personal details."
      );
      return;
    }

    if (!areAllDocumentsUploaded()) {
      Alert.alert("Missing Documents", "Please upload all required documents.");
      return;
    }

    setReviewModalVisible(true);
  };

  const handleSubmit = () => {
    setReviewModalVisible(false);
    Alert.alert(
      "Success",
      "Your application has been submitted successfully. You will receive a confirmation email shortly.",
      [{ text: "OK" }]
    );
  };

  const FormField = ({
    label,
    iconName,
    value,
    onChangeText,
    placeholder = "",
    isDropdown = false,
    onPress,
    required = false,
  }: {
    label: string;
    iconName: string;
    value: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    isDropdown?: boolean;
    onPress?: () => void;
    required?: boolean;
  }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>
        {label} {required && <Text style={{ color: COLORS.error }}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        <View style={styles.iconContainer}>
          <FontAwesome name={iconName} size={16} color={COLORS.primary} />
        </View>

        {isDropdown ? (
          <TouchableOpacity
            style={styles.dropdownInput}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text style={value ? styles.inputText : styles.placeholderText}>
              {value || placeholder}
            </Text>
            <FontAwesome name="chevron-down" size={14} color={COLORS.primary} />
          </TouchableOpacity>
        ) : (
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || label}
            placeholderTextColor={COLORS.lightText}
          />
        )}
      </View>
    </View>
  );

  const SelectionModal = ({
    visible,
    onClose,
    title,
    options,
    onSelect,
  }: {
    visible: boolean;
    onClose: () => void;
    title: string;
    options: string[];
    onSelect: (option: string) => void;
  }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="times" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.optionsList}
            showsVerticalScrollIndicator={false}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionItem}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option}</Text>
                <FontAwesome
                  name="chevron-right"
                  size={14}
                  color={COLORS.lightText}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const ImagePreviewModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={imagePreviewModal}
      onRequestClose={() => setImagePreviewModal(false)}
    >
      <View style={styles.previewModalOverlay}>
        <View style={styles.previewModalContainer}>
          <View style={styles.previewModalHeader}>
            <Text style={styles.previewModalTitle}>{currentPreviewName}</Text>
            <TouchableOpacity
              onPress={() => setImagePreviewModal(false)}
              style={styles.closeButton}
            >
              <FontAwesome name="times" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          {currentPreviewImage && (
            <View style={styles.previewImageContainer}>
              <Image
                source={{ uri: currentPreviewImage.uri }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            </View>
          )}

          <View style={styles.previewModalActions}>
            <TouchableOpacity
              style={[
                styles.previewModalButton,
                { backgroundColor: COLORS.secondary },
              ]}
              onPress={() => {
                if (currentPreviewName) {
                  pickImage(currentPreviewName);
                }
              }}
            >
              <FontAwesome
                name="refresh"
                size={16}
                color={COLORS.primary}
                style={styles.buttonIcon}
              />
              <Text
                style={[
                  styles.previewModalButtonText,
                  { color: COLORS.primary },
                ]}
              >
                Replace
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.previewModalButton,
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
                style={styles.buttonIcon}
              />
              <Text style={styles.previewModalButtonText}>
                {documentVerification[currentPreviewName]
                  ? "Verified"
                  : "Verify"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const ReviewModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={reviewModalVisible}
      onRequestClose={() => setReviewModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: "90%" }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Review Your Application</Text>
            <TouchableOpacity
              onPress={() => setReviewModalVisible(false)}
              style={styles.closeButton}
            >
              <FontAwesome name="times" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.reviewContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.reviewSection}>
              <Text style={styles.reviewSectionTitle}>Policy Information</Text>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewItemLabel}>Category:</Text>
                <Text style={styles.reviewItemValue}>{selectedCategory}</Text>
              </View>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewItemLabel}>Subcategory:</Text>
                <Text style={styles.reviewItemValue}>
                  {selectedSubcategory}
                </Text>
              </View>
            </View>

            <View style={styles.reviewSection}>
              <Text style={styles.reviewSectionTitle}>Personal Details</Text>
              {Object.keys(formValues).map((key, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewItemLabel}>{key}:</Text>
                  <Text style={styles.reviewItemValue}>
                    {formValues[key] || "Not provided"}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.reviewSection}>
              <Text style={styles.reviewSectionTitle}>Documents</Text>
              {Object.keys(documentIcons).map((doc, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewItemLabel}>{doc}:</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.reviewItemValue}>
                      {documentImages[doc] ? "Uploaded" : "Missing"}
                    </Text>
                    {documentImages[doc] && (
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
                    )}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.reviewDisclaimer}>
              <FontAwesome
                name="info-circle"
                size={16}
                color={COLORS.lightText}
              />
              <Text style={styles.reviewDisclaimerText}>
                By submitting this application, you confirm that all information
                provided is accurate and complete.
              </Text>
            </View>
          </ScrollView>

          <View style={styles.reviewActions}>
            <TouchableOpacity
              style={[
                styles.reviewActionButton,
                { backgroundColor: COLORS.secondary },
              ]}
              onPress={() => setReviewModalVisible(false)}
            >
              <Text
                style={[
                  styles.reviewActionButtonText,
                  { color: COLORS.primary },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.reviewActionButton,
                { backgroundColor: COLORS.primary },
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.reviewActionButtonText}>
                Confirm & Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Policy Information</Text>

          <FormField
            label="Policy Category"
            iconName="list"
            value={selectedCategory}
            placeholder="Select Policy Category"
            isDropdown={true}
            onPress={() => setCategoryModalVisible(true)}
            required={true}
          />

          <FormField
            label="Policy Subcategory"
            iconName="tags"
            value={selectedSubcategory}
            placeholder={
              selectedCategory ? "Select Subcategory" : "Select Category First"
            }
            isDropdown={true}
            onPress={() => {
              if (selectedCategory) {
                setSubcategoryModalVisible(true);
              } else {
                Alert.alert(
                  "Policy Category Required",
                  "Please select a policy category first"
                );
              }
            }}
            required={true}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          {Object.keys(icons).map((item) => (
            <FormField
              key={item}
              label={item}
              iconName={icons[item as keyof typeof icons]}
              value={formValues[item] || ""}
              onChangeText={(text) => updateFormValue(item, text)}
              required={[
                "Name",
                "DOB",
                "Mob No",
                "E-Mail Id",
                "Father's Name",
                "Mother's Name",
                "Address as per Proof",
              ].includes(item)}
            />
          ))}
        </View>

        <View style={styles.documentsSection}>
          <Text style={styles.documentsSectionTitle}>Required Documents</Text>
          <Text style={styles.documentsSectionSubtitle}>
            All documents must be uploaded before submission
          </Text>

          {Object.keys(documentIcons).map((doc, index) => (
            <View key={index} style={styles.documentItem}>
              <View style={styles.documentIconContainer}>
                <FontAwesome
                  name={documentIcons[doc as keyof typeof documentIcons]}
                  size={16}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.documentInfoContainer}>
                <Text style={styles.documentText}>{doc}</Text>
                {documentImages[doc] && (
                  <View style={styles.documentStatusContainer}>
                    <FontAwesome
                      name={
                        documentVerification[doc] ? "check-circle" : "clock-o"
                      }
                      size={12}
                      color={
                        documentVerification[doc]
                          ? COLORS.success
                          : COLORS.lightText
                      }
                    />
                    <Text
                      style={[
                        styles.documentStatusText,
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

              <View style={styles.documentActions}>
                {documentImages[doc] ? (
                  <>
                    <TouchableOpacity
                      style={styles.documentActionButton}
                      onPress={() => previewDocument(doc)}
                    >
                      <FontAwesome
                        name="eye"
                        size={16}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                    <View style={styles.documentActionDivider} />
                    <TouchableOpacity
                      style={styles.documentActionButton}
                      onPress={() => pickImage(doc)}
                    >
                      <FontAwesome
                        name="refresh"
                        size={16}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.documentUploadButton}
                    onPress={() => pickImage(doc)}
                  >
                    <FontAwesome
                      name="upload"
                      size={14}
                      color={COLORS.primary}
                    />
                    <Text style={styles.documentUploadText}>Upload</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          <View style={styles.documentsHelp}>
            <FontAwesome
              name="info-circle"
              size={14}
              color={COLORS.lightText}
            />
            <Text style={styles.documentsHelpText}>
              All documents must be clearly visible and in JPG, PNG or PDF
              format
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={handleReview}
        >
          <Text style={styles.submitButtonText}>Review Application</Text>
          <FontAwesome name="arrow-right" size={16} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>

      <SelectionModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        title="Select Policy Category"
        options={policyCategories}
        onSelect={(option) =>
          setSelectedCategory(option as keyof typeof policySubcategories)
        }
      />

      <SelectionModal
        visible={subcategoryModalVisible}
        onClose={() => setSubcategoryModalVisible(false)}
        title="Select Policy Subcategory"
        options={availableSubcategories}
        onSelect={setSelectedSubcategory}
      />

      <ImagePreviewModal />
      <ReviewModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.lightText,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  formSection: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: responsiveFontSize(1.7),
    color: COLORS.lightText,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  iconContainer: {
    paddingHorizontal: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  textInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    color: COLORS.text,
    fontSize: responsiveFontSize(1.8),
  },
  dropdownInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    color: COLORS.text,
    fontSize: responsiveFontSize(1.8),
  },
  placeholderText: {
    color: COLORS.lightText,
    fontSize: responsiveFontSize(1.8),
  },
  documentsSection: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    marginHorizontal: 15,
  },
  documentsSectionTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 5,
  },
  documentsSectionSubtitle: {
    fontSize: responsiveFontSize(1.6),
    color: COLORS.lightText,
    marginBottom: 15,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  documentIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  documentInfoContainer: {
    flex: 1,
  },
  documentText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.text,
    fontWeight: "500",
  },
  documentStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  documentStatusText: {
    fontSize: responsiveFontSize(1.4),
    marginLeft: 5,
  },
  documentActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  documentActionButton: {
    padding: 8,
  },
  documentActionDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  documentUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: "dashed",
  },
  documentUploadText: {
    color: COLORS.primary,
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
    marginLeft: 6,
  },
  documentsHelp: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 8,
  },
  documentsHelpText: {
    fontSize: responsiveFontSize(1.6),
    color: COLORS.lightText,
    marginLeft: 8,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "600",
    color: COLORS.text,
  },
  closeButton: {
    padding: 5,
  },
  optionsList: {
    padding: 15,
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.text,
  },

  // Image preview modal styles
  previewModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewModalContainer: {
    width: width * 0.9,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    overflow: "hidden",
  },
  previewModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  previewModalTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: COLORS.text,
  },
  previewImageContainer: {
    height: 300,
    backgroundColor: "#f1f1f1",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewModalActions: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  previewModalButton: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    flexDirection: "row",
  },
  previewModalButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonIcon: {
    marginRight: 8,
  },

  // Review modal styles
  reviewContent: {
    padding: 15,
  },
  reviewSection: {
    marginBottom: 20,
  },
  reviewSectionTitle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 10,
  },
  reviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
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
    flex: 2,
    textAlign: "right",
  },
  reviewDisclaimer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "flex-start",
  },
  reviewDisclaimerText: {
    fontSize: responsiveFontSize(1.6),
    color: COLORS.lightText,
    marginLeft: 10,
    flex: 1,
  },
  reviewActions: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  reviewActionButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  reviewActionButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
