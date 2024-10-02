import React from 'react';
import { Stack } from '@mui/material';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ActionKey from './action-key';
import { t } from 'i18next';

interface MaidRoomComponentProps {
  history: PropertyActionHistoryResponse;
}

const MaidRoomComponentComponent: React.FC<MaidRoomComponentProps> = ({ history }) => {
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

export default MaidRoomComponentComponent;
