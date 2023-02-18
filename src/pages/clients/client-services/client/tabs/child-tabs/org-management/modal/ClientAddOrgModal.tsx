import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FormInput from "../../../../../../../../components/form/form-input/FormInput";
import FormSelectCustom from "../../../../../../../../components/form/form-select/FormSelect";
import { selectUserOrgId } from "../../../../../../../../redux/auth/auth-selectors";
import { useAppSelector } from "../../../../../../../../redux/store";
import {
  addOrganizationClient,
  getAllOrganization,
} from "../../../../../../../../utils/service-api/org-service-api";
import { ShowModal } from "../../../../../../../../utils/types/baseType";
import { Organization } from "../../../../../../../../utils/types/orgType";
import { useContextClientId } from "../../../../ClientDetail";
import AddOrgClientFormik from "../formik/ClientAddOrgFormik";

const ClientAddOrgModal: FC<ShowModal> = ({ isOpened, handleClose }) => {
  const outletContext = useContextClientId();
  const [organizations, setOrganizations] = useState<Organization[]>();
  const userOrgId = useAppSelector(selectUserOrgId);

  useEffect(() => {
    userOrgId &&
      getAllOrganization(userOrgId).then((data) => {
        setOrganizations(data.data?.data);
      });
  }, [userOrgId]);

  return (
    <>
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm tổ chức</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={AddOrgClientFormik.initValue}
            onSubmit={async (values, actions) => {
              if (outletContext.clientId) {
                actions.setSubmitting(true);
                const fetch = await addOrganizationClient(
                  outletContext.clientId,
                  values
                );

                AddOrgClientFormik.handleSubmit(actions, fetch.errors);
              }
            }}
          >
            {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormSelectCustom
                      className="row mb-3"
                      label="Tổ chức"
                      name="orgId"
                      handleChange={handleChange}
                      options={organizations}
                      optionValue={"orgId"}
                      optionLabel={"name"}
                      error={errors.orgId}
                    />
                    <FormInput
                      className="row mb-3"
                      label="Mô tả"
                      placeholder="Mô tả..."
                      name="description"
                      value={values.description}
                      handleChange={handleChange}
                    />
                  </Col>
                </Row>
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Đóng
                </Button>
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  Thêm
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClientAddOrgModal;
