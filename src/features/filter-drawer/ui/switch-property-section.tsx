import React from 'react';
import { t } from 'i18next';
import { Switch } from '@mui/material';
import LabelFilterTypography from '../../../shared/typography/label-filter-typography';
import { MainContainer } from '../../../widgets/drawers/ui/ui';

const SwitchPropertySection = () => {
  return (
    <>
      <MainContainer>
        <LabelFilterTypography text={t('Passport')} />
        <Switch />
      </MainContainer>
      <MainContainer>
        <LabelFilterTypography text={t('Titel deed')} />
        <Switch />
      </MainContainer>
      <MainContainer>
        <LabelFilterTypography text={t('Photos')} />
        <Switch />
      </MainContainer>
    </>
  );
};

export default SwitchPropertySection;
