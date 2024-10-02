import React from 'react';
import { t } from 'i18next';
import { ToggleButton } from '@mui/material';
import LabelFilterTypography from '../typography/label-filter-typography';
import { ToggleFilterButtonComponent } from './ui/ui';

interface ToggleButtonsProps {
  text: string;
  values: string[];
  showStudioOption: boolean;
}

const ToggleFilterButtons: React.FC<ToggleButtonsProps> = ({ text, values, showStudioOption }) => {
  return (
    <>
      <LabelFilterTypography text={text} />
      <ToggleFilterButtonComponent fullWidth={true} aria-label='Basic button group'>
        {showStudioOption && <ToggleButton value={'studio'}>{t('Studio')}</ToggleButton>}
        {values.map((value) => (
          <ToggleButton key={value} value={value}>
            {value}
          </ToggleButton>
        ))}
      </ToggleFilterButtonComponent>
    </>
  );
};

export default ToggleFilterButtons;
