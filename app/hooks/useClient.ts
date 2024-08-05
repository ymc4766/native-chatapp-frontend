import { baseURL } from "../api/client";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import useAuth from "./useAuth";
import asyncStorage, { Keys } from "../utils/asyncStorage";
import { runAxiosAsync } from "../api/runAxiosAsync";
import { useDispatch } from "react-redux";
import { updateAuthState } from "../redux/auth";

type Response = {
  tokens: {
    access: string;
    refresh: string;
  };
};
const authClient = axios.create({ baseURL: baseURL });
const useClient = () => {
  const dispatch = useDispatch();
  const { authState } = useAuth();
  const token = authState?.profile?.accessToken;

  authClient.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refershAuthLogic = async (failedRequest: any) => {
    // read refresh token from async storage

    const refreshToken = await asyncStorage.get(Keys.REFRESH_TOKEN);

    const options = {
      method: "POST",
      data: { refreshToken },
      url: `${baseURL}/users/refresh-token `,
    };
    const res = await runAxiosAsync<Response>(axios(options));

    if (res?.tokens) {
      failedRequest.response.config.headers.Authorization =
        "Bearer " + res.tokens.access;
      await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access);

      await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);
      dispatch(
        updateAuthState({
          profile: { ...authState.profile!, accessToken: res?.tokens.access },
          pending: false,
        })
      );
      return Promise.resolve();
    }
  };
  createAuthRefreshInterceptor(authClient, refershAuthLogic);

  return { authClient };
};

export default useClient;
