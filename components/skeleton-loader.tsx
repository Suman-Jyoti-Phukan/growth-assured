import React, { useEffect, useRef } from "react";

import { View, StyleSheet, Animated, SafeAreaView } from "react-native";

const Skeleton = ({
  height,
  width,
}: {
  height: number;
  width: string | number;
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.skeleton, { height, width, opacity } as any]}
    />
  );
};

const SkeletonLoader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Skeleton height={30} width="60%" />

      <View style={styles.spacing} />

      <Skeleton height={150} width="100%" />

      <View style={styles.spacing} />

      <Skeleton height={150} width="100%" />

      <View style={styles.spacing} />

      <Skeleton height={150} width="100%" />
    </SafeAreaView>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  skeleton: {
    backgroundColor: "#e8e8e4",
    borderRadius: 12,
  },
  spacing: {
    height: 20,
  },
});
