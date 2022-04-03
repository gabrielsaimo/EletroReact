import React, { useEffect, useRef } from "react";
import { Dimensions, View, Animated, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function SkeletonLoading({ visible, children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    fadeIn();
    return () => fadeIn();
  }, []);
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        fadeOut();
      }, 500);
    });
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        fadeIn();
      }, 500);
    });
  };

  if (visible) {
    return (
      <View style={styles.conteiner}>
        <View>
          <View style={styles.card}>
            <View
              style={{
                marginRight: 15,
                width: 120,
                height: 120,
                backgroundColor: "#D4D4D4",
                overflow: "hidden",
              }}
            >
              <Animated.View
                style={[styles.fadingContainer, { opacity: fadeAnim }]}
              ></Animated.View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-evenly" }}>
              <View
                style={{
                  backgroundColor: "#D4D4D4",
                  height: 30,
                  borderRadius: 5,
                  overflow: "hidden",
                  width: width / 2,
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
              <View
                style={{
                  backgroundColor: "#D4D4D4",
                  height: 16,
                  borderRadius: 5,
                  width: width / 3,
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
              <View
                style={{
                  backgroundColor: "#D4D4D4",
                  height: 12,
                  borderRadius: 5,
                  width: width / 5,
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
              <View
                style={{
                  backgroundColor: "#D4D4D4",
                  height: 30,
                  borderRadius: 5,
                  width: width / 3,
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ width: width, height: 1, backgroundColor: "#fff" }}
        ></View>
        <View>
          <View style={{ marginTop: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  marginRight: 15,
                  width: 120,
                  height: 120,
                  backgroundColor: "#D4D4D4",
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
              <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    overflow: "hidden",
                    width: width / 2,
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 16,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 10,
                    borderRadius: 5,
                    width: width / 5,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ width: width, height: 1, backgroundColor: "#fff" }}
        ></View>
        <View>
          <View style={{ marginTop: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  marginRight: 15,
                  width: 120,
                  height: 120,
                  backgroundColor: "#D4D4D4",
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
              <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    overflow: "hidden",
                    width: width / 2,
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 16,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 10,
                    borderRadius: 5,
                    width: width / 5,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ width: width, height: 1, backgroundColor: "#fff" }}
        ></View>
        <View>
          <View style={{ marginTop: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  marginRight: 15,
                  width: 120,
                  height: 120,
                  backgroundColor: "#D4D4D4",
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
              <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    overflow: "hidden",
                    width: width / 2,
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 16,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 10,
                    borderRadius: 5,
                    width: width / 5,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ width: width, height: 1, backgroundColor: "#fff" }}
        ></View>
        <View>
          <View style={{ marginTop: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  marginRight: 15,
                  width: 120,
                  height: 120,
                  backgroundColor: "#D4D4D4",
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
              <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    overflow: "hidden",
                    width: width / 2,
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 16,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 10,
                    borderRadius: 5,
                    width: width / 5,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ width: width, height: 1, backgroundColor: "#fff" }}
        ></View>
        <View>
          <View style={{ marginTop: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  marginRight: 15,
                  width: 120,
                  height: 120,
                  backgroundColor: "#D4D4D4",
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={[styles.fadingContainer, { opacity: fadeAnim }]}
                ></Animated.View>
              </View>
              <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    overflow: "hidden",
                    width: width / 2,
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 16,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 10,
                    borderRadius: 5,
                    width: width / 5,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
                <View
                  style={{
                    backgroundColor: "#D4D4D4",
                    height: 30,
                    borderRadius: 5,
                    width: width / 3,
                    overflow: "hidden",
                  }}
                >
                  <Animated.View
                    style={[styles.fadingContainer, { opacity: fadeAnim }]}
                  ></Animated.View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return <>{children}</>;
}

const styles = StyleSheet.create({
  conteiner: {
    padding: 1,
  },
  card: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 10,
  },
  fadingContainer: {
    padding: "100%",
    backgroundColor: "#BDBDBD",
    opacity: 0.1,
  },
});
