import React from 'react';
import { Stack } from '@mui/material';
import { calculateDaysLeft } from '../../shared/lib/calculate-days-left';
import { BodyTypography_2, BodyTypographyMedium_1 } from '../../shared/typography/ui/ui';
import { theme } from '../../theme';
import type { CollectionResponse } from '../../shared/api/generated-api/api.schemas';

interface NameAndExpiresDateProps {
  data: Pick<CollectionResponse, 'id' | 'name' | 'expiresAt'>;
  hoveredCollectionId: string | null;
}

const NameAndExpiresDate: React.FC<NameAndExpiresDateProps> = ({ data, hoveredCollectionId }) => {
  return (
    <Stack>
      <BodyTypographyMedium_1
        sx={{
          width: '250px',
          color: hoveredCollectionId === data.id && calculateDaysLeft(data.expiresAt) > 0 ? theme.link.default : '',
        }}
      >
        {data.name}
        {/*//TODO уточнить про кол-во дней*/}
      </BodyTypographyMedium_1>
      <BodyTypography_2 sx={{ color: calculateDaysLeft(data.expiresAt) < 3 ? theme.base.error.text : '' }}>
        {calculateDaysLeft(data.expiresAt) <= 0 ? '' : `${calculateDaysLeft(data.expiresAt)}  days left`}
      </BodyTypography_2>
    </Stack>
  );
};

export default NameAndExpiresDate;
