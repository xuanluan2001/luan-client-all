import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  email: "",
  username: "",
  token: "",
  orgId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
