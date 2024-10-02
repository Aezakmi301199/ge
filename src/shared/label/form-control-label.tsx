import React, { FC } from 'react';
import {
  FormControlLabel as FormControlLabelMui,
  FormControlLabelProps as FormControlLabelPropsMui,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { theme } from '../../theme';
import { t } from 'i18next';

interface FormControlLabelProps extends Pick<FormControlLabelPropsMui, 'label' | 'required' | 'disabled'> {
  gutterBottom: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  sx?: SxProps;
  control?: null | React.ReactElement<any, any>;
}

const EmptyElement: FC = () => {
  return null; // Ничего не рендерится
};

// Link to FormControlLabel https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-–%C2%A0Base-librarie?node-id=399-2222&node-type=canvas&t=0rU7e2UixjIdMlgX-0

const FormControlLabel: FC<FormControlLabelProps> = ({
  control = null,
  label,
  gutterBottom,
  labelPlacement = 'start',
  sx,
  required,
  disabled,
}) => {
  const translatedLabel = typeof label === 'string' ? t(label) : undefined;

  return (
    <FormControlLabelMui
      sx={{
        '&.MuiFormControlLabel-root': {
          marginLeft: '0px',
          marginRight: '0px',
          alignItems: 'normal',
          gap: theme.base.module['0_5'],
        },
        color: theme.text.primary,
        '&.MuiFormLabel-asterisk': {
          color: theme.base.error.main,
        },
        '&>.MuiStack-root': {
          display: 'flex',
          flexDirection: 'row',
          gap: theme.base.module['0_5'],
          padding: `${theme.base.module[1]} 0 0 0`,
        },
        '.MuiFormControlLabel-asterisk': {
          color: theme.base.error.main,
        },
        ...sx,
      }}
      required={required}
      labelPlacement={labelPlacement}
      componentsProps={{
        typography: {
          gutterBottom,
          sx: {
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.15px',
            marginLeft: '0px',
            color: theme.text.primary,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        },
      }}
      control={control ?? <EmptyElement />}
      disabled={disabled}
      label={translatedLabel}
    />
  );
};

export default FormControlLabel;
