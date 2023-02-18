import { FormikHelpers } from "formik";
import { NavigateFunction } from "react-router-dom";
import { WrapperResponse } from "service-sdk/lib/types/BaseType";
import { submitLogin } from "./processSubmitLogin";

interface Values {
  username: string;
  password: string;
}

export const initValue: Values = {
  username: "",
  password: "",
};

export const handleSubmit = (
  actions: FormikHelpers<Values>,
  sessionId: string,
  errors: WrapperResponse | undefined,
  navigate: NavigateFunction
) => {
  actions.resetForm({
    values: {
      username: "",
      password: "",
    },
  });

  if (errors) {
    actions.setFieldError("email", errors.data?.email);
    actions.setFieldError("password", errors.data?.password);

    setTimeout(() => {
      actions.setErrors({});
    }, 5000);
  }

  submitLogin(sessionId, navigate);
  actions.setSubmitting(false);
};
