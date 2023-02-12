import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { FC, ReactElement } from "react";
import { Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import FormInput from "../../components/form/form-input/FormInput";
import IconButton from "../../components/icon-button/IconButton";
import { loginPIN } from "../../utils/service-api/auth-service-api";

import loginBackground from "./img/loginbackground.png";
import { initValue, handleSubmit } from "./formik/LoginPINFormik";

import { useLocation, useNavigate } from "react-router-dom";

const LoginPIN: FC = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const sessionId = Cookies.get(location.state?.cookieName);
  const ssidOtp = Cookies.get("_SSID-PIN");
  useEffect(() => {
    if (sessionId === undefined || !ssidOtp) {
      if (ssidOtp === "actived") {
        Cookies.remove("_SSID-PIN");
      }
      navigate("/login");
    }
  }, [sessionId, navigate, ssidOtp]);

  return (
    <Container fluid>
      <Row className="g-2 mt-percent-1_5">
        <Col sm={8} md={7}>
          <Card className="login main-half text-center">
            <Card.Body>
              <h4 className="card-title">Kiểm tra mã PIN</h4>
              <h5 className="mb-4">Nhập mã PIN để hoàn tất đăng nhập!</h5>
              <div className="text-success">
                <hr />
              </div>
              <Formik
                initialValues={initValue}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  const fetch = await loginPIN(sessionId, values);
                  handleSubmit(actions, fetch.data, fetch.errors, navigate);
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
                    <div className="text-danger mb-4">{errors.error}</div>
                    <FormInput
                      className="row mb-3"
                      label="Mã OTP"
                      placeholder="Nhập mã PIN"
                      name="pinCode"
                      value={values.pinCode}
                      controlId={"validationFormik01"}
                      handleChange={handleChange}
                    />
                    <IconButton
                      className="btn-custom"
                      tittle="Tiếp theo"
                      disabled={isSubmitting}
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

export default LoginPIN;
