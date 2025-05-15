import { FontAwesome } from "@expo/vector-icons";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

import { COLORS } from "./colors";

import { responsiveFontSize } from "react-native-responsive-dimensions";

interface SelectionModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: { name: string; id: string }[];
  onSelect: (option: string) => void;
}

export const SelectionModal: React.FC<SelectionModalProps> = ({
  visible,
  onClose,
  title,
  options,
  onSelect,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={selectionModalStyles.modalOverlay}>
      <View style={selectionModalStyles.modalContainer}>
        <View style={selectionModalStyles.modalHeader}>
          <Text style={selectionModalStyles.modalTitle}>{title}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={selectionModalStyles.closeButton}
          >
            <FontAwesome name="times" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={selectionModalStyles.optionsList}
          showsVerticalScrollIndicator={false}
        >
          {options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={selectionModalStyles.optionItem}
              onPress={() => {
                onSelect(option.name || option);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text style={selectionModalStyles.optionText}>
                {option.name || option}
              </Text>
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

const selectionModalStyles = StyleSheet.create({
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
    paddingBottom: 30,
    maxHeight: "80%",
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
  optionsList: { maxHeight: 350 },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionText: { fontSize: responsiveFontSize(1.8), color: COLORS.text },
});
