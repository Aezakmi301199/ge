import React from 'react';
import { t } from 'i18next';
import SmallInputWithStartAdornment from '../../../shared/input/small-input-with-start-adornment';
import PropertySelect from '../../../shared/select/property-select';
import LabelFilterTypography from '../../../shared/typography/label-filter-typography';
import { InputAdornmentContainer, SharedSectionContainer } from '../../../widgets/drawers/ui/ui';

interface SharedSectionProps {
  propertySize: string[];
}

const SharedSection: React.FC<SharedSectionProps> = ({ propertySize }) => {
  return (
    <>
      <SharedSectionContainer>
        <LabelFilterTypography text={t('Price')} />
        <InputAdornmentContainer>
          <SmallInputWithStartAdornment type={'string'} text={t('min')} />
          <SmallInputWithStartAdornment type={'string'} text={t('max')} />
        </InputAdornmentContainer>
      </SharedSectionContainer>
      <SharedSectionContainer>
        <LabelFilterTypography text={t('Property size')} />
        <InputAdornmentContainer>
          <SmallInputWithStartAdornment type={'number'} text={t('min')} />
          <SmallInputWithStartAdornment type={'number'} text={t('max')} />
        </InputAdornmentContainer>
        <PropertySelect values={propertySize} sx={{ marginLeft: '20px' }} />
      </SharedSectionContainer>
      <SharedSectionContainer>
        <LabelFilterTypography text={t('Floor')} />
        <InputAdornmentContainer>
          <SmallInputWithStartAdornment type={'number'} text={t('min')} />
          <SmallInputWithStartAdornment type={'number'} text={t('max')} />
        </InputAdornmentContainer>
      </SharedSectionContainer>
    </>
  );
};

export default SharedSection;
