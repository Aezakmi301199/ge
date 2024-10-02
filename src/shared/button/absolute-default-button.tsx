import React from 'react';
import { t } from 'i18next';
import { AbsoluteButtonComponent } from './ui/ui';
import { SxProps } from '@mui/material';

interface DefaultButtonProps {
  text: string;
  sx?: SxProps;
  onClick?: () => void;
}

const AbsoluteDefaultButton: React.FC<DefaultButtonProps> = ({ text, sx, onClick }) => {
  return (
    <AbsoluteButtonComponent
      size={'large'}
      onClick={onClick}
      sx={{ position: 'absolute', bottom: '16px', left: '16px', ...sx }}
      variant={'contained'}
    >
      {t(text)}
    </AbsoluteButtonComponent>
  );
};

export default AbsoluteDefaultButton;
