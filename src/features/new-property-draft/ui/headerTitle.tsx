import React from 'react';
import { Box } from '@mui/material';
import { t } from 'i18next';
import { HeadlineTypography_5 } from '../../../shared/typography/ui/ui';
import { observer } from 'mobx-react-lite';
import { theme } from '../../../theme';

const HeaderTitle = () => {
  return (
    <Box
      sx={{
        padding: '16px 16px 8px 16px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: theme.base.module['1'],
      }}
    >
      <HeadlineTypography_5 padding={`6px 0px`}>{t('New property')}</HeadlineTypography_5>
    </Box>
  );
};

export default observer(HeaderTitle);
