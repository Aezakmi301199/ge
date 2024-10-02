import React from 'react';
import { theme } from '../../../theme';
import { BodyTypography_1, BodyTypographyMedium_1 } from '../../../shared/typography/ui/ui';
import { formatIsoDate } from '../../../shared/lib/format-date';
import { Stack } from '@mui/material';
import { replaceActionKey } from '../../../shared/lib/replace-action-key';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import { t } from 'i18next';

interface PropertyShowRequestedProps {
  history: PropertyActionHistoryResponse;
}

const PropertyShowRequested: React.FC<PropertyShowRequestedProps> = ({ history }) => {
  return (
    <Stack gap={theme.gap.gap_md}>
      <Stack flexDirection={'row'} gap={theme.gap.gap_md}>
        <BodyTypography_1 sx={{ color: theme.text.secondary }}>{formatIsoDate(history.createdAt)}</BodyTypography_1>
        <BodyTypography_1 sx={{ color: theme.text.secondary }}>
          {history.updater.name} {history.updater.surname}
        </BodyTypography_1>
      </Stack>
      <Stack gap={theme.gap.gap_md} flexDirection={'row'}>
        <BodyTypographyMedium_1>{replaceActionKey(history.data.key)}</BodyTypographyMedium_1>
        <BodyTypography_1>{t('requested')}</BodyTypography_1>
      </Stack>
    </Stack>
  );
};

export default PropertyShowRequested;
