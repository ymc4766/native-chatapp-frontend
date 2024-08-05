import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC } from "react";

interface Props<T> {
  visible: boolean;
  onRequestClose(state: boolean): void;
  options: T[];
  renderItem(item: T): JSX.Element;
  onPress(item: T): void;
}
const OptionModal = <T extends unknown>({
  visible,
  options,
  onPress,
  renderItem,
  onRequestClose,
}: Props<T>) => {
  const handleClose = () => onRequestClose(!visible);

  return (
    <Modal transparent visible={visible} onRequestClose={handleClose}>
      <Pressable onPress={handleClose} style={styles.container}>
        <View style={styles.container} className="py-4">
          <ScrollView style={styles.modalContent} className="text-slate-200">
            {options.map((item, index) => {
              return (
                <Pressable key={index} onPress={() => onPress(item)}>
                  {renderItem(item)}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "87%",
    backgroundColor: "#071952",
    padding: 10,
    borderRadius: 7,
    maxHeight: 200,
  },
});
