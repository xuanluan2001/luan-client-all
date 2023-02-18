import { FormikHelpers } from "formik";
import { ResetOTPRequest } from "../../../utils/types/authType";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "react";
import { WrapperResponse } from "service-sdk/lib/types/BaseType";
import { resetOTP } from "../../../utils/service-api/auth-service-api";
import { SubmitLogin } from "./processSubmitLogin";
import { Toast } from "../../../utils/service-api/base-rest";
import Cookies from "js-cookie";

interface Values {
  otpCode: string;
  error?: string;
}

export const initValue: Values = {
  otpCode: "",
  error: "",
};

export const handleSubmit = (
  actions: FormikHelpers<Values>,
  sessionId: string,
  errors: WrapperResponse | undefined,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  setError: Dispatch<React.SetStateAction<string>>
) => {
  actions.resetForm({
    values: {
      otpCode: "",
    },
  });
  setError("");
  if (errors) {
    typeof errors?.data === "string"
      ? actions.setFieldError("error", errors.data)
      : actions.setFieldError("error", errors?.data?.otpCode);

    // clear error after 5s
    setTimeout(() => {
      actions.setErrors({});
    }, 5000);
  }

  //clear cookie of otp if check successful otp
  SubmitLogin(sessionId, dispatch, navigate);
  sessionId && Cookies.remove("_SSID-OTP");

  actions.setSubmitting(false);
};

export const resetOTPHanleClick = async (
  sessionId: string,
  setError: Dispatch<React.SetStateAction<string>>,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>
) => {
  const request: ResetOTPRequest = { sessionId: sessionId };

  const fetch = await resetOTP(request);
  if (fetch.data) {
    Toast.fire({ icon: "success", title: "Đã gửi mã OTP đến mail của bạn!" });
  } else {
    if (typeof fetch.errors?.data === "string") {
      setError(fetch.errors?.data);
    } else {
      setError(fetch.errors?.data?.sessionId);
    }
    Toast.fire({ icon: "error", title: fetch.errors?.data });
    setTimeout(() => {
      setError("");
    }, 4000);
  }
  setIsLoading(false);
};

export const handleError = (err?: string, error?: string): string => {
  return error ? error : err ? err : "";
};
