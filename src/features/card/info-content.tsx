import React from 'react';
import { Box, Stack } from '@mui/material';
import { calculateCostSquareMeter } from '../../shared/lib/calculate-cost-square-meter';
import { separateThousand } from '../../shared/lib/separate-thousand';
import {
  BodyTypography_1,
  BodyTypography_2,
  BodyTypographyMedium_2,
  HeadlineTypography_6,
} from '../../shared/typography/ui/ui';
import { theme } from '../../theme';
import { PropertyResponse } from '../../shared/api/generated-api/api.schemas';

interface InfoContentProps {
  property: Pick<PropertyResponse, 'price' | 'city' | 'building' | 'typeFields' | 'district'>;
}

const InfoContent: React.FC<InfoContentProps> = ({ property }) => {
  return (
    <>
      <HeadlineTypography_6>AED {separateThousand(property.price)}</HeadlineTypography_6>
      <BodyTypography_1 sx={{ color: theme.text.secondary }}>
        {[
          'AED / sqm',
          separateThousand(
            calculateCostSquareMeter({
              price: property.price,
              area: property.typeFields?.size,
            }),
          ),
        ].join(' ')}
      </BodyTypography_1>
      <Stack flexDirection='row' gap={'4px'}>
        <BodyTypography_2 sx={{ lineHeight: '28px', color: theme.text.primary }}>
          {property.city.name && `${property.city.name}, `}
        </BodyTypography_2>
        <BodyTypography_2 sx={{ lineHeight: '28px', color: theme.text.primary }}>
          {property.district?.name && `${property.district?.name}, `}
        </BodyTypography_2>
        <BodyTypography_2 sx={{ lineHeight: '28px', color: theme.text.primary }}>
          {property.building?.name && `${property.building?.name}`}
        </BodyTypography_2>
      </Stack>
      <Box sx={{ display: 'flex', gap: '4px', padding: '8px 0 0 0' }}>
        <BodyTypographyMedium_2>{`${property.typeFields?.size} sqm`}</BodyTypographyMedium_2>
        <BodyTypographyMedium_2>{`${property.typeFields?.bedroomCount} Bedrooms`}</BodyTypographyMedium_2>
        <BodyTypographyMedium_2>{`${property.typeFields?.bathroomCount} Bathrooms`}</BodyTypographyMedium_2>
      </Box>
    </>
  );
};

export default InfoContent;
