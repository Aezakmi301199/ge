import React from 'react';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { renderValue } from '../../../shared/lib/render-value';
import { Stack } from '@mui/material';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ActionKey from './action-key';

interface FinancialAndFurnishedProps {
  history: PropertyActionHistoryResponse;
}

const FinancialAndFurnishedComponent: React.FC<FinancialAndFurnishedProps> = ({ history }) => {
  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        {!history.data.oldValue && history.data.newValue && (
          <BodyTypography_1>{renderValue(history.data.newValue)} added</BodyTypography_1>
        )}
        {history.data.newValue && history.data.oldValue && (
          <HistoryTypography>
            <BodyTypography_1>{renderValue(history.data.oldValue)}</BodyTypography_1>
            <BodyTypography_1>→</BodyTypography_1>
            <BodyTypography_1>{renderValue(history.data.newValue)}</BodyTypography_1>
          </HistoryTypography>
        )}
        {history.data.oldValue && !history.data.newValue && (
          <BodyTypography_1>{renderValue(history.data.oldValue)} removed</BodyTypography_1>
        )}
      </HistoryTypography>
    </Stack>
  );
};

export default FinancialAndFurnishedComponent;
