import Cookies from "js-cookie";
import React, { FC, ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const isSuccessLogin = (): boolean => {
  const isLoggedIn = Cookies.get("_SSID-FINAL");
  // const tokenHeader = Cookies.get("_Token-CODE");

  return isLoggedIn ? true : false;
};

const PrivatedRoutes: FC = (): ReactElement => {
  const isAuth = isSuccessLogin();

  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivatedRoutes;
