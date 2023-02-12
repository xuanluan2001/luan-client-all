import React, { FC, ReactNode } from "react";
import { Col, Form } from "react-bootstrap";

type PropsType = {
  className?: string;
  label?: string;
  icon?: ReactNode;
  name?: string;
  options?: any[];
  optionValue?: string;
  optionLabel?: string;
  error?: string;
  placeholder?: string;
  type?: string;
  handleChange?: any;
};

const FormSelectCustom: FC<PropsType> = ({
  className,
  label,
  icon,
  name,
  options,
  optionValue,
  optionLabel,
  error,
  placeholder,
  handleChange,
}) => {
  return (
    <Form.Group className={className}>
      <Col sm={3} className="col-form-label">
        <Form.Label>
          {icon}
          <h5>{label}</h5>
        </Form.Label>
      </Col>
      <Col md={8} sm={9}>
        <Form.Select
          placeholder={placeholder}
          isInvalid={!!error}
          name={name}
          onChange={handleChange}
        >
          <option defaultChecked value={""}>
            Chọn Dữ Liệu
          </option>
          {options?.map((data, index) => (
            <option key={index} value={data[optionValue ? optionValue : ""]}>
              {data[optionLabel ? optionLabel : ""]}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export default FormSelectCustom;
