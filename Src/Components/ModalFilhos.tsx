import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import ProdutoFilhos from "./ProdutoFilhos";
const { height } = Dimensions.get("window");

const Modal = ({ volt, show, close, sku, navigation, navigator, ceps }) => {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 100 }),
      Animated.timing(state.opacity, { toValue: 1, duration: 300 }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(state.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <View style={styles.indicator} />

        <ProdutoFilhos
          sku={sku}
          navigation={navigation}
          navigate={navigator}
          volt={volt}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
  },
  modal: {
    bottom: 0,
    position: "absolute",
    height: "35%",
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 5,
  },
  text: {
    marginTop: 50,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#9b59b6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
    borderColor: "rgba(0,0,0,0.5)",
  },
});

export default Modal;
