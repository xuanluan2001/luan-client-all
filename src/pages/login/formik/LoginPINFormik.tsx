import { FormikHelpers } from "formik";
import Cookies from "js-cookie";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { WrapperResponse } from "service-sdk/lib/types/BaseType";
import { SubmitLogin } from "./processSubmitLogin";

interface Values {
  pinCode: string;
  error?: string;
}

export const initValue: Values = {
  pinCode: "",
  error: "",
};

export const handleSubmit = (
  actions: FormikHelpers<Values>,
  sessionId: string,
  errors: WrapperResponse | undefined,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction
) => {
  actions.resetForm({
    values: {
      pinCode: "",
    },
  });
  if (errors) {
    typeof errors.data === "string"
      ? actions.setFieldError("error", errors.data)
      : actions.setFieldError("error", errors.data?.pinCode);
    // clear error after 5s
    setTimeout(() => {
      actions.setErrors({});
    }, 5000);
  }

  SubmitLogin(sessionId, dispatch, navigate);
  sessionId && Cookies.remove("_SSID-PIN");
  actions.setSubmitting(false);
};
