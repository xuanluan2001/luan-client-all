import { Formik } from "formik";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FormInput from "../../../../../../components/form/form-input/FormInput";
import FormSelectCustom from "../../../../../../components/form/form-select/FormSelect";
import { getAllBusinessClient } from "../../../../../../utils/service-api/client-service-api";
import { addOrganizationClient } from "../../../../../../utils/service-api/org-service-api";
import { ShowModal } from "../../../../../../utils/types/baseType";
import { Client } from "../../../../../../utils/types/clientType";
import ClientAddOrgFormik from "../../../../../clients/client-services/client/tabs/child-tabs/org-management/formik/ClientAddOrgFormik";
import { useContextOrgId } from "../../../../OrganizationDetail";

const OrgAddClientModal: FC<ShowModal> = ({ isOpened, handleClose }) => {
  const outletContext = useContextOrgId();
  const [clients, setClients] = useState<Client[]>();
  const [client_Id, setClient_Id] = useState<string>("");

  const handleChangeClientId = (event: ChangeEvent<HTMLInputElement>) => {
    setClient_Id(event.target.value);
  };

  useEffect(() => {
    getAllBusinessClient().then((data) => {
      setClients(data.data?.data);
    });
  }, [outletContext.orgId]);

  return (
    <>
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm tổ chức</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={ClientAddOrgFormik.initValue}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);
              values.orgId = outletContext.orgId;

              const fetch = await addOrganizationClient(client_Id, values);

              ClientAddOrgFormik.handleSubmit(actions, fetch.errors);
            }}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormSelectCustom
                      className="row mb-3"
                      label="Dịch vụ"
                      name="client_Id"
                      handleChange={handleChangeClientId}
                      options={clients}
                      optionValue={"clientId"}
                      optionLabel={"name"}
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

export default OrgAddClientModal;
