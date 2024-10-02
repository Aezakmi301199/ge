import React, { useState } from 'react';
import { diffCss } from 'diff';
import { Stack, Typography } from '@mui/material';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { OutlinedWhiteButton } from '../../../shared/button/ui/ui';
import { HistoryTypography } from './ui';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ActionKey from './action-key';

interface DescriptionUpdatedProps {
  history: PropertyActionHistoryResponse;
}

const DescriptionUpdated: React.FC<DescriptionUpdatedProps> = ({ history }) => {
  const [showFullHistoryContent, setShowFullHistoryContent] = useState(false);
  let diff;

  if (typeof history.data.oldValue === 'string' && typeof history.data.newValue === 'string') {
    diff = diffCss(history.data.oldValue, history.data.newValue);
  }

  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        <BodyTypography_1>{t(!history.data.oldValue ? 'added' : 'edited')}</BodyTypography_1>
      </HistoryTypography>
      <Stack flexDirection={'row'} gap={'4px'} flexWrap={'wrap'} display={showFullHistoryContent ? 'flex' : 'none'}>
        {diff?.map((part, index) => {
          const color = part.added
            ? theme.base.success.text
            : part.removed
              ? theme.base.error.text
              : theme.text.primary;

          return (
            <Stack flexDirection={'row'} key={index}>
              <Typography color={color}>{part.value}</Typography>
            </Stack>
          );
        })}
      </Stack>
      {history.data.oldValue && (
        <OutlinedWhiteButton
          sx={{ padding: '4px 10px', height: '30px', fontSize: '13px' }}
          onClick={() => setShowFullHistoryContent((prevState) => !prevState)}
        >
          {t(showFullHistoryContent ? 'Hide details' : 'Show details')}
        </OutlinedWhiteButton>
      )}
    </Stack>
  );
};

export default DescriptionUpdated;
