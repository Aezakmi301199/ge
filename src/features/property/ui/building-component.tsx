import React from 'react';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { separateThousand } from '../../../shared/lib/separate-thousand';
import { renderValue } from '../../../shared/lib/render-value';
import { Stack } from '@mui/material';
import { PropertyHistoryBuilding } from '../../../shared/interfaces/property-history';
import ActionKey from './action-key';

interface BuildingComponentProps {
  history: PropertyHistoryBuilding;
}

const BuildingComponent: React.FC<BuildingComponentProps> = ({ history }) => {
  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        <BodyTypography_1>{separateThousand(renderValue(history.data.oldValue?.name))}</BodyTypography_1>
        <BodyTypography_1>→</BodyTypography_1>
        <BodyTypography_1>{separateThousand(renderValue(history.data.newValue?.name))}</BodyTypography_1>
      </HistoryTypography>
    </Stack>
  );
};

export default BuildingComponent;
