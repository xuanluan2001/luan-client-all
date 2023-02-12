import React, { FC, ReactNode } from "react";
import { Col, Form } from "react-bootstrap";
import "./FormInput.css";

type PropsType = {
  controlId?: string;
  className?: string;
  label?: string;
  icon?: ReactNode;
  name?: string;
  id?: string;
  value?: any;
  error?: string;
  placeholder?: string;
  type?: string;
  handleChange?: any;
  row?: number;
  disabled?: boolean;
};

const FormInput: FC<PropsType> = ({
  controlId,
  className,
  label,
  icon,
  name,
  id,
  value = undefined,
  error,
  placeholder,
  type,
  handleChange,
  row,
  disabled,
}) => {
  return (
    <Form.Group controlId={controlId} className={className}>
      <Col sm={3} className="col-form-label">
        <Form.Label>
          {icon}
          <h5>{label}</h5>
        </Form.Label>
      </Col>
      <Col md={8} sm={9}>
        <Form.Control
          type={type}
          placeholder={placeholder}
          isInvalid={!!error}
          name={name}
          value={value ? value : ""}
          id={id}
          onChange={handleChange}
          as={row ? "textarea" : undefined}
          rows={row}
          disabled={disabled}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export default FormInput;
