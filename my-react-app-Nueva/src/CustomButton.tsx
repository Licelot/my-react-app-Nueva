import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  style?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label, style }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick} style={style}>
      {label}
    </Button>
  );
};

export default CustomButton;
