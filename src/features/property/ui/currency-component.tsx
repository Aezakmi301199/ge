import React from 'react';
import { Stack } from '@mui/material';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { renderValue } from '../../../shared/lib/render-value';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import { isPropertyHistoryCurrency } from '../../../shared/type-guards/currency';
import ActionKey from './action-key';

interface CurrencyComponentProps {
  history: PropertyActionHistoryResponse;
}

const CurrencyComponent: React.FC<CurrencyComponentProps> = ({ history }) => {
  if (isPropertyHistoryCurrency(history)) {
    return (
      <Stack gap={theme.gap.gap_md}>
        <TimeAndNameOfHistory history={history} />
        <HistoryTypography>
          <ActionKey actionKey={history.data.key} />
          {!history.data.oldValue?.isoLetters.length && <BodyTypography_1>{t('added')}</BodyTypography_1>}
          {history.data.oldValue?.isoLetters && history.data.newValue?.isoLetters && (
            <>
              <BodyTypography_1>{renderValue(history.data.oldValue?.isoLetters)}</BodyTypography_1>
              <BodyTypography_1>→</BodyTypography_1>
              <BodyTypography_1>{renderValue(history.data.newValue?.isoLetters)}</BodyTypography_1>
            </>
          )}
        </HistoryTypography>
      </Stack>
    );
  }

  return null;
};

export default CurrencyComponent;
