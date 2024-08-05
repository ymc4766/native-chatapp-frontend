import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import colors from "../utils/colors";

interface Props {}

const heading = "Online Marketplace  for Used Goods  ";
const subHeading =
  "Buy or Sell goods with trust. chat directly with sellers for Goods ";
const Welcomeheader: FC<Props> = (props) => {
  return (
    <View className="py-3 mb-6 text-slate-200  font-pregular">
      <Text className="text-lg font-bold text-center text-primary">
        {heading}
      </Text>
      <Text className="text-sm text-center text-primary mt-2 ">
        {subHeading}
      </Text>
    </View>
  );
};

export default Welcomeheader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  heading: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 5,
    color: colors.primary,
  },
  subHeading: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 14,
    color: colors.primary,
  },
});
