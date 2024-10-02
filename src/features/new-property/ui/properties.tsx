import React from 'react';
import { t } from 'i18next';
import { Box, Typography } from '@mui/material';
import TextInput from '../../../shared/input/text-input';
import PropertySelect from '../../../shared/select/property-select';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import { ContainerBlock, PropertySection } from '../../../shared/ui-kit/styled';

const Properties = () => {
  return (
    <ContainerBlock>
      <HeadlineTypography_6>{t('Apartment')}</HeadlineTypography_6>
      <PropertySection>
        <TextInput label={'Unit number'} />
        <TextInput label={'Bathrooms'} />
        <TextInput label={'Bedrooms'} />
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <TextInput label={'Property size'} />
          <PropertySelect values={['sqm', 'sqft']} sx={{ width: '100px' }} />
        </Box>
        <TextInput label={'Floor'} required={false} />
      </PropertySection>
      <Typography>{t('A view of')}</Typography>
      <PropertySelect values={['Water', 'Electricity']} sx={{ width: '100%' }} />
    </ContainerBlock>
  );
};

export default Properties;
