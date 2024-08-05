import { Modal, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import LottieView from "lottie-react-native";
import colors from "../utils/colors";

interface Props {
  visible: boolean;
}

const Spinner: FC<Props> = ({ visible }) => {
  if (!visible) return null;
  return (
    <Modal animationType="fade" transparent>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/loading.json")}
          autoPlay
          loop
          style={{ flex: 1, transform: [{ scale: 0.2 }] }}
        />
      </View>
    </Modal>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backDrop,
  },
});
