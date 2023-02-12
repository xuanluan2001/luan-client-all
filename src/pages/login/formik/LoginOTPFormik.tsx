import { FormikHelpers } from "formik";
import Cookies from "js-cookie";
import { ResetOTPRequest } from "../../../utils/types/authType";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "react";
import { WrapperResponse } from "service-sdk/lib/types/BaseType";
import {
  getCurrentUserInformation,
  resetOTP,
} from "../../../utils/service-api/auth-service-api";

interface Values {
  otpCode: string;
  error?: string;
}

export const initValue: Values = {
  otpCode: "",
  error: "",
};

export const handleSubmit = async (
  actions: FormikHelpers<Values>,
  datas: string | undefined,
  errors: WrapperResponse | undefined,
  navigate: NavigateFunction,
  setError: Dispatch<React.SetStateAction<string>>
) => {
  actions.setSubmitting(false);
  actions.resetForm({
    values: {
      otpCode: "",
    },
  });
  if (errors !== undefined) {
    setError("");
    if (typeof errors.data === "string") {
      actions.setFieldError("error", errors.data);
    } else {
      actions.setFieldError("error", errors.data?.otpCode);
    }
    // clear error after 1.5s
    setTimeout(() => {
      actions.resetForm({ errors: {} });
    }, 5000);
  } else {
    if (datas !== undefined && typeof datas === "string") {
      //clear cookie of otp if check successful otp
      Cookies.remove("_SSID-OTP");

      const cookieName: string = "_SSID-LOGIN-CODE";
      //set type cookie to redirect page
      let cookieType: string = "";
      if (datas.startsWith("PIN")) {
        //redirect to check-pin page to check pin code
        cookieType = "_SSID-PIN";
        Cookies.set(cookieType, "actived");
        Cookies.set(cookieName, datas);
        navigate("/check-pin", { state: { cookieName: cookieName } });
      } else if (datas.startsWith("FINAL")) {
        //redirect to dashboard page
        cookieType = "_SSID-FINAL";
        Cookies.set(cookieType, "actived", { expires: 0.5 });
        await getCurrentUserInformation(datas)
          .then((data) => Cookies.set("_Token-CODE", data.data?.token))
          .catch((error) => console.log(error));
        navigate("/dashboard");
      }
    }
  }
};

export const resetOTPHanleClick = async (
  sessionId: string | undefined,
  setError: Dispatch<React.SetStateAction<string>>,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>
) => {
  const request: ResetOTPRequest = { sessionId: sessionId };
  const fetch = await resetOTP(request);
  if (fetch.data === undefined || fetch.errors !== undefined) {
    if (typeof fetch.errors?.data === "string") {
      setError(fetch.errors?.data);
    } else {
      setError(fetch.errors?.data?.sessionId);
    }
    setTimeout(() => {
      setError("");
    }, 4000);
  } else {
    alert("Mã OTP đã được gửi đến email của bạn!");
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }
};

export const handleError = (
  err: string | undefined,
  error: string | undefined
): string | undefined => {
  if (error) {
    err = "";
    return error;
  }

  return err;
};
