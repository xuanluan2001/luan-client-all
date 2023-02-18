import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtResponse } from "../../utils/types/authType";

export interface AuthState {
  email: string;
  username: string;
  token: string;
  orgId: string;
  isLogined: boolean;
}

const initialState: AuthState = {
  email: "",
  username: "",
  token: "",
  orgId: "",
  isLogined: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<JwtResponse>) => {
      state.orgId = action.payload.orgId;
      state.token = action.payload.token;
      state.isLogined = true;
    },
    resetAuthState: () => initialState,
  },
});

export const { resetAuthState, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
