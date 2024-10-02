import React from 'react';
import { Autocomplete as MuiAutoComplete, AutocompleteProps as MuiAutocompleteProps, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Size } from '../enums/size.enum';
import { theme } from '../../theme';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../enums/screen.enum';
export interface AutoCompleteProps<T>
  extends Omit<MuiAutocompleteProps<T, false, boolean, false>, 'renderInput' | 'options'> {
  id?: string;
  width?: string;
  inputLabel?: string;
  name?: string;
  required: boolean;
  error?: boolean;
  options: T[];
}

export const StyledTextField = styled(TextField)((props) => ({
  '& .MuiAutocomplete-inputRoot': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: props.error ? theme.base.error.main : '#D1D1D1',
    },
  },
  '&>.MuiOutlinedInput-root.Mui-error>.MuiOutlinedInput-notchedOutline': {
    borderColor: theme.base.error.main,
  },
  '&>.MuiFormLabel-root.Mui-error': {
    color: theme.text.secondary,
  },
  '.MuiFormLabel-asterisk': {
    color: theme.base.error.main,
  },
}));

const AutoComplete = <T,>({
  id = '',
  width,
  onChange,
  value,
  inputLabel = '',
  error,
  required,
  disableClearable = true,
  options,
  renderOption,
  getOptionLabel = (option: string | T | undefined) => option?.toString() || '',
  ...otherProps
}: AutoCompleteProps<T>) => {
  const screen = useScreenWidth();
  return (
    <MuiAutoComplete
      disableClearable={disableClearable}
      id={id}
      value={value}
      size={Size.SMALL}
      options={options}
      style={{ width: width, backgroundColor: theme.bg.input_bg }}
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: theme.gap.gap_md,
        },
        minWidth: '150px',
        borderRadius: theme.gap.gap_md,
        '.MuiFormLabel-asterisk': {
          color: theme.base.error.main,
        },
      }}
      renderOption={renderOption}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <StyledTextField
          error={error}
          {...params}
          size={screen < Screen.MOBILE ? Size.MEDIUM : Size.SMALL}
          label={t(inputLabel)}
          required={required}
        />
      )}
      {...otherProps}
    />
  );
};

export default observer(AutoComplete);
