/* eslint-disable jsx-a11y/no-autofocus */
import { Input } from "@mui/material";

import StyledInputField from "./StyledInputField";

function InputField({
  placeholder,
  required = false,
  type = "text",
  value,
  onChange,
  error,
  name,
  customStyle = {},
}) {
  return (
    <StyledInputField style={customStyle}>
      <Input
        placeholder={placeholder}
        required={required}
        autoFocus
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        name={name}
      />
    </StyledInputField>
  );
}

export default InputField;
