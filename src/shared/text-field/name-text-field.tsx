import React from 'react';
import { t } from 'i18next';
import { SxProps, TextField } from '@mui/material';
import { AmountLimit } from '../enums/amount-limit.enum';
import { theme } from '../../theme';
import { Size } from '../enums/size.enum';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../enums/screen.enum';

interface NameTextFieldProps {
  label: string;
  setCollectionName: React.Dispatch<React.SetStateAction<string | null>>;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  isFromCollectionPage?: boolean;
  handleUpdateCollectionName: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string | null;
  sx?: SxProps;
}

const NameTextField: React.FC<NameTextFieldProps> = ({
  label,
  hasError,
  isFromCollectionPage,
  setCollectionName,
  setHasError,
  handleUpdateCollectionName,
  value,
  sx,
}) => {
  const screen = useScreenWidth();
  return (
    <TextField
      label={t(label)}
      value={value}
      onBlur={isFromCollectionPage ? handleUpdateCollectionName : undefined}
      onChange={(event) => {
        setCollectionName(event.target.value);
        if (event.target.value.length >= AmountLimit.FIVE) {
          setHasError(false);
        }
        if (event.target.value.length <= AmountLimit.FIFTY) {
          setHasError(false);
        }
      }}
      size={screen < Screen.MOBILE ? Size.MEDIUM : Size.SMALL}
      sx={{
        borderRadius: theme.gap.gap_md,
        backgroundColor: theme.bg.button.white.default,
        '.MuiFormHelperText-root': {
          marginLeft: '0px',
        },
        '.Mui-error': {
          color: theme.base.error.main,
        },
        ...sx,
        '& fieldset': { borderRadius: theme.border_radius.border_radius_md },
      }}
      error={hasError}
      helperText={hasError ? t('Length must be between 5 - 50') : ''}
      fullWidth
    />
  );
};

export default NameTextField;
