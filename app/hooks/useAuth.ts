import AsyncStorage from "@react-native-async-storage/async-storage";
import { runAxiosAsync } from "../api/runAxiosAsync";
import client from "../api/client";
// import { SignInRes } from "../views/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, updateAuthState } from "../redux/auth";
import asyncStorage, { Keys } from "../utils/asyncStorage";

export interface SignInRes {
  profile: {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    avatar?: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

type UserInfo = {
  email: string;
  password: string;
};

const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);

  const signIn = async (userInfo: UserInfo) => {
    // setBusy(true);
    dispatch(updateAuthState({ profile: null, pending: true }));

    const res = await runAxiosAsync<SignInRes>(
      client.post(`/users/signin`, userInfo)
    );

    if (res) {
      // store tokens ;
      await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access);
      // await AsyncStorage.setItem("access-token", res.tokens.access);
      await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);
      // await AsyncStorage.setItem("refresh-token", res.tokens.refresh);

      console.log("res", res);

      dispatch(
        updateAuthState({
          profile: { ...res.profile, accessToken: res.tokens.access },
          pending: false,
        })
      );
    } else {
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
    // setBusy(false);
  };

  const loggedIn = authState.profile ? true : false;

  return { signIn, authState, loggedIn };
};

export default useAuth;
