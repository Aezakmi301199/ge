import React from 'react';
import { t } from 'i18next';
import { Typography } from '@mui/material';
import InputMultiselect from '../../../shared/input/input-multiselect';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import { ContainerBlock } from '../../../shared/ui-kit/styled';

const Description = () => {
  return (
    <ContainerBlock>
      <HeadlineTypography_6>{t('Amenities and Description')}</HeadlineTypography_6>
      <Typography>{t('Description')}</Typography>
      <InputMultiselect label={'Description EN'} required={true} />
      <InputMultiselect label={'Description RU'} required={true} />
    </ContainerBlock>
  );
};

export default Description;
