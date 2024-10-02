import React from 'react';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { Stack } from '@mui/material';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ActionKey from './action-key';
import { t } from 'i18next';

interface BalconyComponentProps {
  history: PropertyActionHistoryResponse;
}

const BalconyComponent: React.FC<BalconyComponentProps> = ({ history }) => {
  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        <BodyTypography_1>{history.data.newValue ? t('added') : t('removed')}</BodyTypography_1>
      </HistoryTypography>
    </Stack>
  );
};

export default BalconyComponent;
