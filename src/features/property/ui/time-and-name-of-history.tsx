import React from 'react';
import { theme } from '../../../theme';
import { Stack } from '@mui/material';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { formatIsoDate } from '../../../shared/lib/format-date';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import { PropertyHistoryBuilding, PropertyHistoryView } from '../../../shared/interfaces/property-history';

interface TimeAndNameOfHistoryProps {
  history: Pick<PropertyActionHistoryResponse, 'updater' | 'createdAt'> | PropertyHistoryView | PropertyHistoryBuilding;
}

const TimeAndNameOfHistory: React.FC<TimeAndNameOfHistoryProps> = ({ history }) => {
  return (
    <Stack flexDirection={'row'} gap={theme.gap.gap_md}>
      <BodyTypography_1 sx={{ color: theme.text.secondary }}>{formatIsoDate(history.createdAt)}</BodyTypography_1>
      <BodyTypography_1 sx={{ color: theme.text.secondary }}>
        {history.updater?.name} {history.updater?.surname}
      </BodyTypography_1>
    </Stack>
  );
};

export default TimeAndNameOfHistory;
