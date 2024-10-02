import React from 'react';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { renderValue } from '../../../shared/lib/render-value';
import { HistoryTypography } from './ui';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { Stack } from '@mui/material';
import { PropertyHistoryView } from '../../../shared/interfaces/property-history';
import ActionKey from './action-key';

interface ViewProps {
  history: PropertyHistoryView;
}

const ViewComponent: React.FC<ViewProps> = ({ history }) => {
  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        <BodyTypography_1>{renderValue(history.data.oldValue?.length)}</BodyTypography_1>
        <BodyTypography_1>→</BodyTypography_1>
        <BodyTypography_1>{renderValue(history.data.newValue?.length)}</BodyTypography_1>
      </HistoryTypography>
    </Stack>
  );
};

export default ViewComponent;
