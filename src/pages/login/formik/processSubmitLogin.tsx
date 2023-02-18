import Cookies from "js-cookie";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { getUserInformation } from "../../../redux/auth/auth-thunks";

export const SubmitLogin = async (
  sessionId: string,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction
) => {
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
      Cookies.set(cookieName, sessionId);
      Cookies.set("_SSID-FINAL", "actived");
      // finish login => set Jwt Token to cookie
      dispatch(getUserInformation(sessionId));
    }
  }
};
