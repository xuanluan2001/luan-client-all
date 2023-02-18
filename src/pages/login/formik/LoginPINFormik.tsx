import { FormikHelpers } from "formik";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { WrapperResponse } from "service-sdk/lib/types/BaseType";
import { submitLogin } from "./processSubmitLogin";

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

  submitLogin(sessionId, navigate);
  sessionId && Cookies.remove("_SSID-PIN");
  actions.setSubmitting(false);
};
