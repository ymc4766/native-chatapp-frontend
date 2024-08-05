import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppNavigator from "./AppNavigator";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import ProfileNavigator from "./ProfileNavigator";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import NewListing from "../screens/NewListing";

const Tab = createBottomTabNavigator();

const getOptions = (iconName: string): BottomTabNavigationOptions => {
  return {
    tabBarIcon({ color, size }) {
      return <AntDesign name={iconName as any} size={size} color={color} />;
    },
    title: "",
  };
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeNavigator"
        component={AppNavigator}
        options={getOptions("home")}
      />
      <Tab.Screen
        name="NewListing"
        component={NewListing}
        options={getOptions("pluscircleo")}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={getOptions("user")}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
