import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
// import AppNavigator from "./AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import auth, { Profile, getAuthState, updateAuthState } from "../redux/auth";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { runAxiosAsync } from "../api/runAxiosAsync";
import Spinner from "../ui/Spinner";
import TabNavigator from "./TabNavigator";
import useClient from "../hooks/useClient";
import asyncStorage, { Keys } from "../utils/asyncStorage";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ff0032",
  },
};

// const Stack = createNativeStackNavigator();
interface Props {}
const Navigator: FC<Props> = (props) => {
  const authState = useSelector(getAuthState);
  const { authClient } = useClient();
  const dispatch = useDispatch();
  const loggedIn = authState.profile ? true : false;

  // console.log("auth", authState);
  const fetchAuthState = async () => {
    dispatch(updateAuthState({ pending: false, profile: null }));

    const token = await asyncStorage.get(Keys.AUTH_TOKEN);
    if (token) {
      const res = await runAxiosAsync<{ profile: Profile }>(
        authClient.get("/users/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      );

      if (res) {
        dispatch(updateAuthState({ pending: false, profile: res.profile }));
      } else {
        dispatch(updateAuthState({ pending: false, profile: null }));
      }
    }
  };

  useEffect(() => {
    fetchAuthState();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Spinner visible={authState.pending} />
      {!loggedIn ? <AuthNavigator /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
