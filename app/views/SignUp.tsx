import React, { FC, useState } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from "react-native";
import axios from "axios";

import CustomInput from "../components/CustomInput";
import Welcomeheader from "../components/Welcomeheader";
import CustomButton from "../components/CustomBtn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import CustomKeyAvoidingView from "../ui/CustomKeyAvoidingView";
import { newUserSchema, yupValidate } from "../utils/validator";
import { runAxiosAsync } from "../api/runAxiosAsync";
import { showMessage } from "react-native-flash-message";
import client from "../api/client";
import { SignInRes } from "./SignIn";
// import * as yup from "yup";

interface Props {}

const SignUp: FC<Props> = (props) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleChange = (field: string) => {
    return (text: string) => setUserInfo({ ...userInfo, [field]: text });
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    const { values, error } = await yupValidate(newUserSchema, userInfo);

    if (error) return showMessage({ message: error, type: "warning" });

    const res = await runAxiosAsync<{ message: string }>(
      client.post(`/users/register`, values)
    );

    if (res?.message) {
      showMessage({ message: res.message, type: "success" });
      const signInRes = await runAxiosAsync<SignInRes>(
        client.post(`/users/signin`, values)
      );
    }
    setIsLoading(false);
    // console.log(res);
  };

  return (
    <CustomKeyAvoidingView>
      <SafeAreaView className="flex-1 w-full h-full px-6 py-4 items-center">
        <Image
          source={{
            uri: "https://images.pexels.com/photos/3127880/pexels-photo-3127880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
          className="w-[100px] h-[200px] rounded-full py-3 mt-3"
          resizeMode="contain"
        />

        <Welcomeheader />
        <CustomInput
          placeholder="name"
          value={userInfo.name}
          onChangeText={handleChange("name")}
          autoCapitalize="none"
        />
        <CustomInput
          placeholder="Email"
          keyboardType="email-address"
          value={userInfo.email}
          onChangeText={handleChange("email")}
          autoCapitalize="none"
        />
        <CustomInput
          placeholder="Password"
          value={userInfo.password}
          onChangeText={handleChange("password")}
          secureTextEntry
          autoCapitalize="none"
        />
        {/* <CustomInput
          placeholder="Confirm Password"
          value={userInfo.confirmPassword}
          onChangeText={handleChange("confirmPassword")}
          secureTextEntry
          autoCapitalize="none"
        /> */}
        <CustomButton
          title="Sign Up"
          handlePress={handleSignUp}
          containerStyles="mt-5 bg-blue-500 px-6 text-center"
          textStyles="text-white"
          isLoading={isLoading}
        />
        <Text
          onPress={() => navigation.navigate("SignIn")}
          className="mt-5 text-lg text-gray-500"
        >
          Already have an account? Log In
        </Text>
      </SafeAreaView>
    </CustomKeyAvoidingView>
  );
};

export default SignUp;
