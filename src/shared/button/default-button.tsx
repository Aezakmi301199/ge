import React from 'react';
import { t } from 'i18next';
import { DefaultButtonComponent } from './ui/ui';
import { SxProps } from '@mui/material';

type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

interface DefaultButtonProps {
  text: string;
  sx?: SxProps;
  onClick?: (event: React.MouseEvent) => void;
  color?: Color;
  children?: React.ReactNode;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ text, sx, onClick, color, children }) => {
  return (
    <DefaultButtonComponent onClick={onClick} sx={{ ...sx }} size={'large'} variant={'contained'} color={color}>
      {children}
      {t(text)}
    </DefaultButtonComponent>
  );
};

export default DefaultButton;
