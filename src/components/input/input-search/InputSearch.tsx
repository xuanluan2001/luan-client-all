import React, { ChangeEventHandler, FC } from "react";
import { Form, InputGroup } from "react-bootstrap";
import IconButton from "../../icon-button/IconButton";

type PropsType = {
  className?: string;
  placeHolder?: string;
  icon?: string;
  name?: string;
  value?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  list?: string;
  isButton?: boolean;
};

const InputSearch: FC<PropsType> = ({
  className,
  placeHolder,
  icon,
  name,
  value,
  handleChange,
  isButton = true,
}) => {
  return (
    <InputGroup className={className}>
      <Form.Control
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={handleChange}
      />
      {isButton && <IconButton icon={icon} className="btn-custom" />}
    </InputGroup>
  );
};

export default InputSearch;
