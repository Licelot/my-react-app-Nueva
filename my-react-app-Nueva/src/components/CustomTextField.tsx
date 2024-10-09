import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type CustomTextFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & TextFieldProps

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  variant = 'outlined',
  fullWidth = true,
  value,
  onChange,
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomTextField;