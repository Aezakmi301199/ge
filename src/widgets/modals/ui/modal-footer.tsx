import React from 'react';
import { ButtonLinkContainer, LinkContainer, ModalFooterContainer } from './ui';
import { FileDownloadOutlined, LinkOutlined } from '@mui/icons-material';
import { theme } from '../../../theme';
import { BodyTypography_1, BodyTypography_2 } from '../../../shared/typography/ui/ui';
import { CreateButtonComponent } from '../../../shared/button/ui/ui';
import { t } from 'i18next';

const ModalFooter = () => {
  return (
    <ModalFooterContainer>
      <ButtonLinkContainer>
        <LinkContainer>
          <LinkOutlined sx={{ color: theme.link.default }} />
          <BodyTypography_1>https://rhood.su/collection/de0bea37-f5e2-4457-834f-eed7b8ac119b</BodyTypography_1>
        </LinkContainer>
        <CreateButtonComponent variant={'contained'} endIcon={<FileDownloadOutlined />}>
          {t('Export PDF')}
        </CreateButtonComponent>
      </ButtonLinkContainer>
      <BodyTypography_2 sx={{ color: theme.base.secondary.white }}>
        {t('Copy the link to share the selection')}
      </BodyTypography_2>
    </ModalFooterContainer>
  );
};

export default ModalFooter;
