import { FormikHelpers } from "formik";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { WrapperResponse } from "service-sdk/lib/types/BaseType";
import { getCurrentUserInformation } from "../../../utils/service-api/auth-service-api";

interface Values {
  username: string;
  password: string;
}

export const initValue: Values = {
  username: "",
  password: "",
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
      username: "",
      password: "",
    },
  });
  const cookieName: string = "_SSID-LOGIN-CODE";

  Cookies.remove(cookieName);

  if (errors !== undefined && typeof errors.data !== "string") {
    actions.setFieldError("email", errors.data?.email);
    actions.setFieldError("password", errors.data?.password);

    setTimeout(() => {
      actions.setErrors({});
    }, 5000);
  } else {
    if (datas !== undefined && typeof datas === "string") {
      //set type cookie to redirect page

      let cookieType: string = "";
      if (datas.startsWith("OTP")) {
        //redirect to check-otp page to check otp code
        // 45s= (1 / 86400) * 45
        cookieType = "_SSID-OTP";
        Cookies.set(cookieType, "actived");
        Cookies.set(cookieName, datas);
        navigate("/check-otp", { state: { cookieName: cookieName } });
      } else if (datas.startsWith("PIN")) {
        //redirect to check-pin page to check pin code
        cookieType = "_SSID-PIN";
        Cookies.set(cookieType, "actived");
        Cookies.set(cookieName, datas);
        navigate("/check-pin", { state: { cookieName: cookieName } });
      } else if (datas.startsWith("FINAL")) {
        //redirect to dashboard page
        cookieType = "_SSID-FINAL";
        Cookies.set(cookieType, "actived", { expires: 0.5 });
        // finish login => set Jwt Token to cookie
        await getCurrentUserInformation(datas)
          .then((data) => Cookies.set("_Token-CODE", data.data?.token))
          .catch((error) => console.log(error));
        navigate("/dashboard");
      }
    }
  }
};
