import React from 'react';
import { t } from 'i18next';
import { PrimaryButtonComponent } from './ui/ui';
import { SxProps } from '@mui/material';

interface SharedButtonProps {
  text: string;
  onClick?: () => void | Promise<void>;
  icon?: React.ReactNode;
  sx?: SxProps;
}

const PublishButton: React.FC<SharedButtonProps> = ({ text, onClick, icon, sx }) => {
  return (
    <PrimaryButtonComponent sx={{ ...sx }} variant={'contained'} onClick={onClick} startIcon={icon}>
      {t(text)}
    </PrimaryButtonComponent>
  );
};

export default PublishButton;
