import React from 'react';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { Stack } from '@mui/material';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import { isPublicationHistory } from '../../../shared/type-guards/publication';
import { replaceTargetKey } from '../../../shared/const/targets';
import ActionKey from './action-key';

interface PublishedComponentProps {
  history: PropertyActionHistoryResponse;
}

const PublishedComponent: React.FC<PublishedComponentProps> = ({ history }) => {
  if (!isPublicationHistory(history)) {
    return null;
  }
  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        <BodyTypography_1>
          {history.data.newValue.map((value) => replaceTargetKey(value.target)).join(', ')}
        </BodyTypography_1>
      </HistoryTypography>
    </Stack>
  );
};

export default PublishedComponent;
