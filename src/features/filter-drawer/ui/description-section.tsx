import React from 'react';
import { t } from 'i18next';
import InputMultiselect from '../../../shared/input/input-multiselect';
import LabelFilterTypography from '../../../shared/typography/label-filter-typography';
import { MainContainer } from '../../../widgets/drawers/ui/ui';

const DescriptionSection = () => {
  return (
    <>
      <MainContainer>
        <LabelFilterTypography text={t('Description (RU)')} />
        <InputMultiselect />
      </MainContainer>
      <MainContainer>
        <LabelFilterTypography text={t('Description (EN)')} />
        <InputMultiselect />
      </MainContainer>
    </>
  );
};

export default DescriptionSection;
