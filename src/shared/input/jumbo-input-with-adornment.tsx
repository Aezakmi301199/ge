import React from 'react';
import { InputAdornment, SxProps } from '@mui/material';
import { theme } from '../../theme';
import { t } from 'i18next';
import { JumboInputWithAdornmentComponent } from '../ui-kit/styled';

type Position = 'start' | 'end';

interface InputAdornmentProps {
  position: Position;
  text: string;
  sx?: SxProps;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText?: string;
  endAdornmentProps?: {
    sx?: SxProps;
  };
}

const JumboInputWithAdornment: React.FC<InputAdornmentProps> = ({
  position,
  text,
  type,
  onChange,
  value,
  error,
  endAdornmentProps,
  helperText,
  sx,
}) => {
  return (
    <JumboInputWithAdornmentComponent
      type={type}
      sx={{ ...sx }}
      error={error}
      value={value}
      onChange={onChange}
      helperText={error && helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment {...endAdornmentProps} position={position}>
            {t(text)}
          </InputAdornment>
        ),
        style: {
          color: theme.text.primary,
          fontSize: '24px',
          borderRadius: theme.common.input.shape.border_radius,
        },
      }}
    />
  );
};

export default JumboInputWithAdornment;
