import React from 'react';
import { t } from 'i18next';
import TextInput from '../../../shared/input/text-input';
import LabelFilterTypography from '../../../shared/typography/label-filter-typography';
import { InputContainer, MainContainer } from '../../../widgets/drawers/ui/ui';

const LocationSection = () => {
  return (
    <MainContainer>
      <LabelFilterTypography text={t('Location')} />
      <InputContainer>
        <TextInput label={'City'} />
        <TextInput label={'District'} />
        <TextInput label={'Building'} />
      </InputContainer>
    </MainContainer>
  );
};

export default LocationSection;
