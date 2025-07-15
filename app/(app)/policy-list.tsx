import { useAuth } from "@/context/AuthContext";

import { ROOT_URL } from "@/utils/routes";

import axios from "axios";

import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";

interface PolicyCategory {
  id: number;
  name: string;
}

interface PolicySubcategory {
  id: number;
  name: string;
  category_id: number;
  commission_amount: string;
  gst_perc: string;
  url: string | null;
  brand: string | null;
  image: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface CategoryWithSubcategories extends PolicyCategory {
  subcategories: PolicySubcategory[];
  isExpanded: boolean;
  isLoadingSubcategories: boolean;
}

export default function PolicyCategoriesList() {
  const { accessToken, userData } = useAuth();

  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState<CategoryWithSubcategories[]>([]);

  const [isPolicyCategoryListLoading, setIsPolicyCategoryListLoading] =
    useState<boolean>(false);

  const getSubcategoryList = async (
    categoryId: number
  ): Promise<PolicySubcategory[]> => {
    try {
      const response = await axios.post(
        `${ROOT_URL}/employee/sub_category`,
        { category_id: categoryId.toString() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.data;
    } catch (err) {
      console.error("Failed to fetch subcategory list:", err);
      Alert.alert("Error", "Failed to load subcategories. Please try again.");
      return [];
    }
  };

  const toggleCategory = async (categoryId: number) => {
    setCategoriesWithSubcategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          const wasExpanded = category.isExpanded;

          if (!wasExpanded && category.subcategories.length === 0) {
            loadSubcategories(categoryId);
          }

          return {
            ...category,
            isExpanded: !wasExpanded,
          };
        }
        return category;
      })
    );
  };

  const loadSubcategories = async (categoryId: number) => {
    setCategoriesWithSubcategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, isLoadingSubcategories: true }
          : category
      )
    );

    const subcategories = await getSubcategoryList(categoryId);

    setCategoriesWithSubcategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories,
              isLoadingSubcategories: false,
            }
          : category
      )
    );
  };

  const handleSubcategoryPress = async (subcategory: PolicySubcategory) => {
    if (subcategory.url) {
      try {
        const supported = await Linking.canOpenURL(subcategory.url);
        if (supported) {
          await Linking.openURL(subcategory.url);
        } else {
          Alert.alert("Error", "Cannot open this URL");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to open URL");
      }
    }
  };

  useEffect(() => {
    async function getCategoryList() {
      try {
        setIsPolicyCategoryListLoading(true);

        const response = await axios.get(`${ROOT_URL}/employee/category`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const categories: PolicyCategory[] = response.data.data;

        const categoriesWithSubcategories: CategoryWithSubcategories[] =
          categories.map((category) => ({
            ...category,
            subcategories: [],
            isExpanded: false,
            isLoadingSubcategories: false,
          }));

        setCategoriesWithSubcategories(categoriesWithSubcategories);
      } catch (err) {
        console.error("Failed to fetch category list:", err);
        Alert.alert("Error", "Failed to load categories. Please try again.");
      } finally {
        setIsPolicyCategoryListLoading(false);
      }
    }

    getCategoryList();
  }, [accessToken]);

  const renderSubcategoryItem = (subcategory: PolicySubcategory) => (
    <TouchableOpacity
      key={subcategory.id}
      style={[
        styles.subcategoryItem,
        subcategory.url && styles.subcategoryItemClickable,
      ]}
      onPress={() => handleSubcategoryPress(subcategory)}
      disabled={!subcategory.url}
    >
      <View style={styles.subcategoryContent}>
        <View style={styles.subcategoryHeader}>
          <Text style={styles.subcategoryName}>{subcategory.name}</Text>
          {subcategory.url && (
            <View style={styles.linkIndicator}>
              <Text style={styles.linkText}>Open Link</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({
    item,
  }: {
    item: CategoryWithSubcategories;
  }) => (
    <View style={styles.categoryCard}>
      <TouchableOpacity
        style={styles.categoryHeader}
        onPress={() => toggleCategory(item.id)}
      >
        <View style={styles.categoryTitleContainer}>
          <View style={styles.categoryIconContainer}>
            <Text style={styles.categoryIcon}>
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.categoryTitle}>{item.name}</Text>
        </View>

        <View style={styles.expandButton}>
          <Text
            style={[
              styles.expandIcon,
              item.isExpanded && styles.expandIconRotated,
            ]}
          >
            ▼
          </Text>
        </View>
      </TouchableOpacity>

      {item.isExpanded && (
        <View style={styles.subcategoriesContainer}>
          {item.isLoadingSubcategories ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#3b82f6" />
              <Text style={styles.loadingText}>Loading subcategories...</Text>
            </View>
          ) : item.subcategories.length > 0 ? (
            item.subcategories.map(renderSubcategoryItem)
          ) : (
            <Text style={styles.noSubcategoriesText}>
              No subcategories available
            </Text>
          )}
        </View>
      )}
    </View>
  );

  if (isPolicyCategoryListLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Policy Categories</Text>
        <Text style={styles.headerSubtitle}>
          Tap on a category to view subcategories
        </Text>
      </View>

      <FlatList
        data={categoriesWithSubcategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748b",
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    overflow: "hidden",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  categoryTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  categoryIcon: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    textTransform: "capitalize",
  },
  expandButton: {
    padding: 8,
  },
  expandIcon: {
    fontSize: 16,
    color: "#64748b",
    transform: [{ rotate: "0deg" }],
  },
  expandIconRotated: {
    transform: [{ rotate: "180deg" }],
  },
  subcategoriesContainer: {
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    backgroundColor: "#f8fafc",
  },
  subcategoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  subcategoryItemClickable: {
    backgroundColor: "#ffffff",
  },
  subcategoryContent: {
    flex: 1,
  },
  subcategoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  subcategoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
  },
  linkIndicator: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  linkText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  subcategoryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#059669",
  },
  noSubcategoriesText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 14,
    fontStyle: "italic",
    padding: 20,
  },
});
