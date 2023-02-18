import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { FC, ReactElement } from "react";
import { Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import FormInput from "../../components/form/form-input/FormInput";
import IconButton from "../../components/icon-button/IconButton";
import { loginOTP } from "../../utils/service-api/auth-service-api";

import loginBackground from "./img/loginbackground.png";
import {
  initValue,
  handleSubmit,
  resetOTPHanleClick,
  handleError,
} from "./formik/LoginOTPFormik";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

const LoginOTP: FC = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const sessionId = Cookies.get(location.state?.cookieName);
  const ssidOtp = Cookies.get("_SSID-OTP");
  useEffect(() => {
    if (!sessionId || !ssidOtp) {
      ssidOtp === "actived" && Cookies.remove("_SSID-OTP");
      navigate("/login");
    }
  }, [sessionId, navigate, ssidOtp]);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const resetOTPClick = () => {
    setIsLoading(true);
    sessionId && resetOTPHanleClick(sessionId, setError, setIsLoading);
  };

  return (
    <Container fluid>
      <Row className="g-2 mt-percent-1_5">
        <Col sm={8} md={7}>
          <Card className="login main-half text-center">
            <Card.Body>
              <h4 className="card-title">Kiểm tra mã OTP</h4>
              <h5 className="mb-4">
                Hãy kiểm tra email của bạn, để lấy mã OTP!
              </h5>
              <div className="text-success">
                <hr />
              </div>
              <Formik
                initialValues={initValue}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  const fetch = await loginOTP(sessionId, values);
                  handleSubmit(
                    actions,
                    fetch.data,
                    fetch.errors,
                    dispatch,
                    navigate,
                    setError
                  );
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
                  isSubmitting,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <div className="text-danger mb-4">
                      {handleError(errors.error, error)}
                    </div>
                    <FormInput
                      className="row mb-3"
                      label="Mã OTP"
                      placeholder="Nhập mã OTP"
                      name="otpCode"
                      value={values.otpCode}
                      controlId={"validationFormik01"}
                      handleChange={handleChange}
                    />
                    <IconButton
                      className="btn-custom mr-2"
                      tittle="Gửi lại mã"
                      type="button"
                      onClick={resetOTPClick}
                      disabled={isLoading || isSubmitting ? true : false}
                    />
                    <IconButton
                      className="btn-custom"
                      tittle="Tiếp theo"
                      disabled={isLoading || isSubmitting ? true : false}
                    />
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Image fluid className="main-half" src={loginBackground} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginOTP;
