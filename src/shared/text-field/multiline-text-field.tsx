import { SendRounded } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

interface MultilineTextFieldProps {
  placeholder: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const MultilineTextField: React.FC<MultilineTextFieldProps> = ({
  placeholder,
  value,
  onChange,
  onKeyDown,
  onClick,
}) => {
  return (
    <TextField
      variant='outlined'
      size='small'
      fullWidth
      placeholder={placeholder}
      multiline
      maxRows={10}
      value={value}
      onChange={onChange ? (event) => onChange(event) : undefined}
      onKeyDown={onKeyDown ? (event) => onKeyDown(event) : undefined}
      InputProps={{
        endAdornment: (
          <IconButton
            disableRipple
            sx={{
              alignSelf: 'flex-end',
            }}
            onClick={onClick}
          >
            <SendRounded />
          </IconButton>
        ),
        sx: {
          '& fieldset': { border: 'none' },
        },
      }}
    />
  );
};
