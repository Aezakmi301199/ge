import React from 'react';
import { Stack } from '@mui/material';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ActionKey from './action-key';

interface DraftComponentProps {
  history: PropertyActionHistoryResponse;
}

const DraftComponent: React.FC<DraftComponentProps> = ({ history }) => {
  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
      </HistoryTypography>
    </Stack>
  );
};

export default DraftComponent;
