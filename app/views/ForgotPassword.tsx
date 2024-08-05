import AppButton from "../ui/AppButton";
import CustomKeyAvoidingView from "../ui/CustomKeyAvoidingView";
import CustomInput from "../components/CustomInput";
import Welcomeheader from "../components/Welcomeheader";
import { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FormDivider from "../ui/FormDivider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { emailRegex } from "../utils/validator";
import { showMessage } from "react-native-flash-message";
import client from "../api/client";
import { runAxiosAsync } from "../api/runAxiosAsync";

interface Props {}

const ForgetPassword: FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async () => {
    if (!emailRegex.test(email)) {
      return showMessage({ message: "Invalie Email !", type: "danger" });
    }

    setBusy(true);

    const res = await runAxiosAsync<{ message: string }>(
      client.post("/forgot-password", { email })
    );

    setBusy(false);

    if (res) {
      showMessage({ message: res.message, type: "success" });
    }
  };

  return (
    <CustomKeyAvoidingView>
      <View style={styles.innerContainer}>
        <Welcomeheader />

        <View style={styles.formContainer}>
          <CustomInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <AppButton
            title={busy ? "Please Wait ..." : "Request Link"}
            onPress={handleSubmit}
            active={!busy}
          />

          <FormDivider />

          {/* <FormNavigator leftTitle="Sign Up" rightTitle="Sign In" /> */}
        </View>
        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate("SignIn")}
            className="text-lg font-psemibold text-secondary"
          >
            Sign in
          </Text>
        </View>
      </View>
    </CustomKeyAvoidingView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 15,
    flex: 1,
  },
  formContainer: {
    marginTop: 30,
  },
});
