import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserInformation } from "../../utils/service-api/auth-service-api";
import { Toast } from "../../utils/service-api/base-rest";

export const getUserInformation = createAsyncThunk(
  "auth/get_user_info",
  async (sessionId: string) => {
    await getCurrentUserInformation(sessionId).then((response) => {
      if (response.errors) {
        Toast.fire({ icon: "error", title: response.errors?.data });
      } else {
        Toast.fire({ icon: "info", title: "Đăng nhập thành công" });
        localStorage.setItem("_TOKEN-INFO", response.data);
        window.location.href = "/dashboard";
      }
    });
  }
);
