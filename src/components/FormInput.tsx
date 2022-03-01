import React, { FC, InputHTMLAttributes } from "react";
import { FormInputLabel, FormInputPanel, Input, InputErrorMessage } from "./StyledComponents";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id: string;
  required: boolean;
  error: any;
}

const FormInput: FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, id, error, required, ...rest }, ref): JSX.Element => {
    return (
      <FormInputPanel>
        <FormInputLabel htmlFor={id}>{label}</FormInputLabel>
        <Input ref={ref} {...rest} type="text" name={name} id={id} />
        {required && error !== undefined && (
          <InputErrorMessage>{error.message}</InputErrorMessage>
        )}
      </FormInputPanel>
    );
  }
);

export default FormInput;
