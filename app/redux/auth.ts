import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Profile = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
  accessToken: string;
};

interface AuthState {
  profile: null | Profile;
  pending: boolean;
}

const initialState: AuthState = {
  pending: false,
  profile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState(authState, { payload }: PayloadAction<AuthState>) {
      authState.pending = payload.pending;
      authState.profile = payload.profile;
    },
  },
});

export const { updateAuthState } = authSlice.actions;
export const getAuthState = createSelector(
  (state: RootState) => state,
  (state) => state.auth
);
export default authSlice.reducer;
