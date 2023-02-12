import { FormikHelpers } from "formik";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { WrapperResponse } from "service-sdk/lib/types/BaseType";
import { getCurrentUserInformation } from "../../../utils/service-api/auth-service-api";

interface Values {
  pinCode: string;
  error?: string;
}

export const initValue: Values = {
  pinCode: "",
  error: "",
};

export const handleSubmit = async (
  actions: FormikHelpers<Values>,
  datas: string | undefined,
  errors: WrapperResponse | undefined,
  navigate: NavigateFunction
) => {
  actions.setSubmitting(false);
  actions.resetForm({
    values: {
      pinCode: "",
    },
  });
  if (errors !== undefined && errors !== null) {
    if (typeof errors.data === "string") {
      actions.setFieldError("error", errors.data);
    } else {
      actions.setFieldError("error", errors.data?.pinCode);
    }
    // clear error after 1.5s
    setTimeout(() => {
      actions.resetForm({ errors: {} });
    }, 5000);
  } else {
    if (datas !== undefined && typeof datas === "string") {
      //clear cookie of otp if check successful otp
      Cookies.remove("_SSID-PIN");

      //redirect to dashboard page
      const cookieType: string = "_SSID-FINAL";
      Cookies.set(cookieType, "actived", { expires: 0.5 });
      await getCurrentUserInformation(datas)
        .then((data) =>
          Cookies.set("_Token-CODE", data.data?.token, {
            sameSite: "Strict",
            secure: true,
          })
        )
        .catch((error) => console.log(error));
      navigate("/dashboard");
    }
  }
};
