import React, { ChangeEventHandler, FC, ReactNode } from "react";
import { Col, Form } from "react-bootstrap";

type PropTypes = {
  className?: string;
  result?: [any];
  name?: string;
  label?: string;
  icon?: ReactNode;
  fieldValue?: string;
  handleChange?: ChangeEventHandler;
  inline?: boolean;
};

const FormCheckBox: FC<PropTypes> = ({
  className,
  result,
  name,
  label,
  icon,
  fieldValue = "name",
  inline,
  handleChange,
}) => {
  return (
    <div className={className}>
      <Col>
        <Form.Label>
          {icon}
          <h5>{label}</h5>
        </Form.Label>
      </Col>
      <Col>
        {result &&
          result.map((data, index) => (
            <Form.Check
              key={index}
              name={name}
              label={data[fieldValue]}
              value={data[fieldValue]}
              onChange={handleChange}
              inline={inline}
            />
          ))}
      </Col>
    </div>
  );
};

export default FormCheckBox;
