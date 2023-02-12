import { Formik } from "formik";
import React, { ReactElement } from "react";
import { FC } from "react";
import { Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import FormInput from "../../components/form/form-input/FormInput";
import IconButton from "../../components/icon-button/IconButton";

import loginBackground from "./img/loginbackground.png";
import { login } from "../../utils/service-api/auth-service-api";

import { initValue, handleSubmit } from "./formik/LoginFormik";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login: FC = (): ReactElement => {
  // remove cookie when load to login page
  Cookies.remove("_SSID-FINAL");
  Cookies.remove("_SSID-LOGIN-CODE");
  Cookies.remove("_Token-CODE");

  const navigate = useNavigate();
  return (
    <Container fluid>
      <Row className="g-2 mt-percent-1_5">
        <Col sm={8} md={7}>
          <Card className="login main-half text-center">
            <Card.Body>
              <h4 className="card-title">Đăng nhập</h4>
              <h5 className="mb-4">
                Nhập thông tin để truy cập đến trang quản lý
              </h5>
              <div className="text-success">
                <hr />
              </div>

              <Formik
                initialValues={initValue}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  const fetch = await login(values);

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
                    <FormInput
                      className="row mb-3"
                      label="Tên đăng nhập"
                      placeholder="Nhập tên đăng nhập"
                      name="username"
                      value={values.username}
                      controlId={"validationFormik01"}
                      handleChange={handleChange}
                      error={errors.username}
                    />
                    <FormInput
                      className="row mb-3"
                      label="Mật khẩu"
                      placeholder="Nhập mật khẩu"
                      type="password"
                      name="password"
                      value={values.password}
                      controlId={"validationFormik02"}
                      handleChange={handleChange}
                      error={errors.password}
                    />
                    <IconButton tittle="Đăng nhập" disabled={isSubmitting} />
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

export default Login;
