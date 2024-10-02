import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { OutlinedWhiteButton } from '../../../shared/button/ui/ui';
import { diffCss } from 'diff';
import { AmenityHistory } from '../../../shared/interfaces/property-history';
import { HistoryTypography } from './ui';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ActionKey from './action-key';

interface AmenityUpdatedProps {
  history: PropertyActionHistoryResponse;
}

const AmenityUpdated: React.FC<AmenityUpdatedProps> = ({ history }) => {
  const amenityToString = (amenities: AmenityHistory[]): string => {
    return amenities.map(({ amenity: { name } }) => name).join('\n');
  };

  const renderAmenityDiff = (oldAmenityString: string, newAmenityString: string) => {
    const diff = diffCss(oldAmenityString, newAmenityString);
    const lines = diff.flatMap((part) =>
      part.value.split('\n').map((line) => ({
        value: line,
        color: part.added ? theme.base.success.text : part.removed ? theme.base.error.text : theme.text.primary,
      })),
    );

    return (
      <Stack>
        {lines.map((line, index) => (
          <Typography key={index} color={line.color}>
            {line.value}
          </Typography>
        ))}
      </Stack>
    );
  };

  const [showFullAmenityContent, setShowFullAmenityContent] = useState(false);

  let newAmenityString = '';
  let oldAmenityString = '';

  if (Array.isArray(history.data.oldValue) && Array.isArray(history.data.newValue)) {
    newAmenityString = amenityToString(history.data.newValue);
    oldAmenityString = amenityToString(history.data.oldValue);
  }

  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        {!Boolean(history.data.oldValue.toString().length) && <BodyTypography_1>{t('added')}</BodyTypography_1>}
        {Boolean(history.data.oldValue.toString().length > 1) &&
          Boolean(history.data.newValue.toString().length > 1) && <BodyTypography_1>{t('edited')}</BodyTypography_1>}
        {Boolean(history.data.newValue.toString().length < 1) && <BodyTypography_1>{t('removed')}</BodyTypography_1>}
      </HistoryTypography>
      <Stack display={showFullAmenityContent ? 'block' : 'none'} spacing={1}>
        {renderAmenityDiff(oldAmenityString, newAmenityString)}
      </Stack>
      {Array.isArray(history.data.oldValue) &&
        !!history.data.oldValue.length &&
        Array.isArray(history.data.newValue) &&
        !!history.data.newValue.length && (
          <OutlinedWhiteButton
            sx={{ padding: '4px 10px', height: '30px', fontSize: '13px' }}
            onClick={() => setShowFullAmenityContent((prevState) => !prevState)}
          >
            {t(showFullAmenityContent ? 'Hide details' : 'Show details')}
          </OutlinedWhiteButton>
        )}
    </Stack>
  );
};

export default AmenityUpdated;
