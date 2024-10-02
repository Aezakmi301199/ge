import React from 'react';
import { t } from 'i18next';
import { TextField } from '@mui/material';
import { theme } from '../../theme';
import { SxProps } from '@mui/system';
import { observer } from 'mobx-react-lite';

interface InputMultiselectProps {
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  sx?: SxProps;
  maxRows?: number;
  minRows?: number;
}

const InputMultiselect: React.FC<InputMultiselectProps> = ({
  label,
  required = false,
  value,
  onChange,
  error,
  helperText,
  sx,
  maxRows = 4,
  minRows,
}) => {
  return (
    <TextField
      required={required}
      fullWidth={true}
      multiline
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText && t(helperText)}
      label={t(label ? label : '')}
      maxRows={maxRows}
      minRows={minRows}
      sx={{
        '&>.MuiOutlinedInput-root.Mui-error>.MuiOutlinedInput-notchedOutline': {
          borderColor: theme.base.error.main,
        },
        '&>.MuiFormHelperText-root': {
          marginLeft: '0px',
        },
        '.MuiFormLabel-asterisk': {
          color: theme.base.error.main,
        },
        '&>.MuiFormLabel-root.Mui-error': {
          color: theme.text.secondary,
        },
        '&>.MuiFormHelperText-root.Mui-error': {
          color: theme.base.error.main,
        },
        ...sx,
      }}
      InputProps={{
        style: {
          borderRadius: theme.common.input.shape.border_radius,
        },
      }}
    />
  );
};

export default observer(InputMultiselect);
