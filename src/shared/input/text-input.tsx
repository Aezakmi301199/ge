import React from 'react';
import { t } from 'i18next';
import { TextField } from '@mui/material';
import { theme } from '../../theme';
import { SxProps } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { match } from 'ts-pattern';

export interface TextInputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string | null;
  type?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  sx?: SxProps;
  showPromptText?: boolean;
  showErrorText?: boolean;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  onBlur,
  required,
  label,
  type,
  placeholder,
  error,
  helperText,
  value,
  showPromptText,
  showErrorText,
  disabled,
  sx,
}) => {
  return (
    <TextField
      size={'small'}
      required={required}
      label={t(label)}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={t(placeholder ? placeholder : '')}
      error={error}
      disabled={disabled}
      helperText={match({ showPromptText, showErrorText, hasError: Boolean(error) })
        .with({ showPromptText: true }, () => helperText && t(helperText))
        .with({ showErrorText: true, hasError: true }, () => helperText && t(helperText))
        .otherwise(() => '')}
      sx={{
        '&>.MuiOutlinedInput-root.Mui-error>.MuiOutlinedInput-notchedOutline': {
          borderColor: theme.base.error.main,
        },
        width: '100%',
        '.MuiFormLabel-asterisk': {
          color: theme.base.error.main,
        },
        '&>.MuiFormLabel-root.Mui-error': {
          color: theme.text.secondary,
        },
        '&>.MuiFormHelperText-root.Mui-error': {
          color: theme.base.error.main,
          marginLeft: '0px',
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

export default observer(TextInput);
