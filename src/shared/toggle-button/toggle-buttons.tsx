import React from 'react';
import LabelFilterTypography from '../typography/label-filter-typography';
import { ToggleButton } from '@mui/material';
import { ToggleButtonComponent } from '../ui-kit/styled';
import { t } from 'i18next';
import { SxProps } from '@mui/system';
import { theme } from '../../theme';
import { observer } from 'mobx-react-lite';

interface ToggleButtonsProps<T = string | number> {
  text: string;
  values: T[];
  showStudioOption: boolean;
  showLabel?: boolean;
  labelProps?: {
    sx?: SxProps;
  };
  toggleButtonProps?: {
    sx?: SxProps;
  };
  value: T;
  onChange: (value: string | undefined) => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  text,
  values,
  showStudioOption,
  toggleButtonProps,
  labelProps,
  showLabel,
  onChange,
  value,
}) => {
  const handleAlignment = (_event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    onChange(newAlignment ?? undefined);
  };

  return (
    <>
      {showLabel && <LabelFilterTypography text={text} sx={labelProps?.sx} />}
      <ToggleButtonComponent
        fullWidth={true}
        sx={{
          '.MuiToggleButton-root.Mui-selected': {
            '&:hover': {
              background: theme.action.selected_primary,
            },
            color: theme.text.text_white,
            background: theme.action.selected_primary,
          },
          ...toggleButtonProps?.sx,
        }}
        aria-label='Basic button group'
        exclusive
        value={value}
        onChange={handleAlignment}
      >
        {showStudioOption && <ToggleButton value={'studio'}>{t('Studio')}</ToggleButton>}
        {values.map((value) => (
          <ToggleButton key={value} value={value}>
            {value}
          </ToggleButton>
        ))}
      </ToggleButtonComponent>
    </>
  );
};

export default observer(ToggleButtons);
