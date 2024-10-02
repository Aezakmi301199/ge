import React from 'react';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { renderValue } from '../../../shared/lib/render-value';
import { replaceStatus } from '../../../shared/lib/replace-status';
import { Stack } from '@mui/material';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ActionKey from './action-key';
import { t } from 'i18next';

interface StatusProps {
  history: PropertyActionHistoryResponse;
}

const StatusComponent: React.FC<StatusProps> = ({ history }) => {
  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        <BodyTypography_1>{renderValue(t(replaceStatus(history.data.oldValue?.toString())))}</BodyTypography_1>
        <BodyTypography_1>→</BodyTypography_1>
        <BodyTypography_1>{renderValue(t(replaceStatus(history.data.newValue?.toString())))}</BodyTypography_1>
      </HistoryTypography>
    </Stack>
  );
};

export default StatusComponent;
