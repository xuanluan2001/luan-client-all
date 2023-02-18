import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getCurrentUserInformation } from "../../utils/service-api/auth-service-api";
import { Toast } from "../../utils/service-api/base-rest";
import { setCurrentUser } from "./auth-slice";

export const getUserInformation = createAsyncThunk(
  "auth/user_info",
  async (sessionId: string, thunkApi) => {
    await getCurrentUserInformation(sessionId).then((response) => {
      if (response.errors) {
        Toast.fire({ icon: "error", title: response.errors?.data });
      } else {
        Toast.fire({ icon: "success", title: "Đăng nhập thành công" });

        Cookies.set("_Token-CODE", response.data?.token);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        thunkApi.dispatch(setCurrentUser(response.data));
        window.location.href = "/dashboard";
      }
    });
  }
);
