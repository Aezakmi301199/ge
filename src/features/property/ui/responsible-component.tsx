import React from 'react';
import { theme } from '../../../theme';
import { Stack } from '@mui/material';
import { BodyTypography_1, BodyTypographyMedium_1 } from '../../../shared/typography/ui/ui';
import { formatIsoDate } from '../../../shared/lib/format-date';
import { HistoryTypography } from './ui';
import { ResponsibleChangedHistory } from '../../../shared/interfaces/property-history';
import { t } from 'i18next';

interface ResponsibleComponentProps {
  history: ResponsibleChangedHistory;
}

const ResponsibleComponent: React.FC<ResponsibleComponentProps> = ({ history }) => {
  return (
    <Stack gap={theme.gap.gap_md}>
      <Stack flexDirection={'row'} gap={theme.gap.gap_md}>
        <BodyTypography_1 sx={{ color: theme.text.secondary }}>{formatIsoDate(history.createdAt)}</BodyTypography_1>
        <BodyTypography_1 sx={{ color: theme.text.secondary }}>
          {history.data.oldUser.name} {history.data.oldUser.surname}
        </BodyTypography_1>
      </Stack>
      <HistoryTypography>
        <BodyTypographyMedium_1>{t('Responsible')}</BodyTypographyMedium_1>
        <BodyTypography_1>
          {history.data.oldUser?.name} {history.data.oldUser?.surname}
        </BodyTypography_1>
        <BodyTypography_1>→</BodyTypography_1>
        <BodyTypography_1>
          {history.data.newUser?.name} {history.data.newUser?.surname}
        </BodyTypography_1>
      </HistoryTypography>
    </Stack>
  );
};

export default ResponsibleComponent;
