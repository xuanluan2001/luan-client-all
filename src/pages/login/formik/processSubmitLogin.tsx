import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { getCurrentUserInformation } from "../../../utils/service-api/auth-service-api";

export const submitLogin = async (
  sessionId: string,
  navigate: NavigateFunction
) => {
  // Cookies.remove(cookieName);
  //set type cookie to redirect page
  const cookieName: string = "_SSID-LOGIN-CODE";

  if (sessionId) {
    if (sessionId.startsWith("OTP")) {
      //redirect to check-otp page to check otp code
      Cookies.set("_SSID-OTP", "actived");
      Cookies.set(cookieName, sessionId);
      navigate("/check-otp", { state: { cookieName: cookieName } });
    } else if (sessionId.startsWith("PIN")) {
      //redirect to check-pin page to check pin code
      Cookies.set("_SSID-PIN", "actived");
      Cookies.set(cookieName, sessionId);
      navigate("/check-pin", { state: { cookieName: cookieName } });
    } else if (sessionId.startsWith("FINAL")) {
      //redirect to dashboard page
      Cookies.set("_SSID-FINAL", "actived");
      // finish login => set Jwt Token to cookie
      await getCurrentUserInformation(sessionId).then((data) =>
        Cookies.set("_Token-CODE", data.data?.token)
      );
      navigate("/dashboard");
    }
  }
};
