import { StatusBar } from "expo-status-bar";
import { FC, useState } from "react";
import { Text, View, Image, SafeAreaView, TextInput } from "react-native";
import Welcomeheader from "../components/Welcomeheader";
import CustomButton from "../components/CustomBtn";
import CustomInput from "../components/CustomInput";
import CustomKeyAvoidingView from "../ui/CustomKeyAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { showMessage } from "react-native-flash-message";
import { signInSchema, yupValidate } from "../utils/validator";
import axios from "axios";
import { runAxiosAsync } from "../api/runAxiosAsync";
import client from "../api/client";
import { useDispatch } from "react-redux";
import { updateAuthState } from "../redux/auth";
// import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../hooks/useAuth";

interface Props {}

const SignIn: FC<Props> = (props) => {
  // const [busy, setBusy] = useState(false);

  const { signIn } = useAuth();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const dispatch = useDispatch();

  const { email, password } = userInfo;

  const handleChange = (field: string) => {
    return (text: string) => setUserInfo({ ...userInfo, [field]: text });
  };

  const submitHandler = async () => {
    const { values, error } = await yupValidate(signInSchema, userInfo);

    if (error) return showMessage({ message: error, type: "warning" });

    if (values) signIn(values);

    // console.log(res);
  };

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <CustomKeyAvoidingView>
      <SafeAreaView className="flex-1 w-full bg-primary-400 text-slate-50 px-6 py-4 items-center">
        <Image
          source={{
            uri: "https://images.pexels.com/photos/4350099/pexels-photo-4350099.jpeg?auto=compress&cs=tinysrgb&w=600",
          }}
          className="w-[200px] h-[370px] rounded-xl "
          resizeMode="contain"
        />

        <Welcomeheader />
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={handleChange("email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={handleChange("password")}
          secureTextEntry
          autoCapitalize="none"
        />
        <View className="flex-col items-center justify-between">
          <CustomButton
            handlePress={submitHandler}
            title="Sign in"
            containerStyles="px-6  text-center "
            // isLoading={busy}
          />
          <Text
            onPress={() => navigation.navigate("ForgetPassword")}
            className="text-lg text-slate-700"
          >
            Forgot Password
          </Text>
        </View>

        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Don't have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate("SignUp")}
            className="text-lg font-psemibold text-secondary"
          >
            Signup
          </Text>
        </View>
      </SafeAreaView>
    </CustomKeyAvoidingView>
  );
};

export default SignIn;
