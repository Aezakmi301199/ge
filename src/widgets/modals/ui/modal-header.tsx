import React from 'react';
import { HeadlineTypography_5 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { IconButton, Stack, SxProps } from '@mui/material';
import { ModalHeaderContainer } from './ui';
import { CloseRoundedButtonComponent } from '../../../shared/button/ui/ui';

interface ModalHeaderProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  sx?: SxProps;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ setIsOpenModal, text, sx }) => {
  return (
    <ModalHeaderContainer>
      <Stack sx={{ width: '100%', ...sx }} flexDirection={'row'}>
        <HeadlineTypography_5>{t(text)}</HeadlineTypography_5>
      </Stack>
      <IconButton onClick={() => setIsOpenModal(false)}>
        <CloseRoundedButtonComponent />
      </IconButton>
    </ModalHeaderContainer>
  );
};

export default ModalHeader;
