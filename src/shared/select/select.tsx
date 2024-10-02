import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SxProps } from '@mui/material';
import { theme } from '../../theme';
import { BodyTypography_1 } from '../typography/ui/ui';
import { SelectChangeEvent, SelectInputProps } from '@mui/material/Select/SelectInput';
import { observer } from 'mobx-react-lite';
import SelectStore from '../store/select-store';

interface ISelectOptions {
  name: string;
  value: string;
}

interface SelectProps extends Omit<SelectInputProps<string>, 'autoWidth' | 'multiple' | 'native'> {
  sx?: SxProps;
  options: ISelectOptions[];
  size?: 'small' | 'medium';
  id?: string;
  onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

const Select: React.FC<SelectProps> = ({ size, options = [], sx, value, onChange, error }) => {
  const handleOnChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    onChange && onChange(event, child);
  };

  return (
    <FormControl size={size}>
      {!value && <InputLabel shrink={false}>Choose</InputLabel>}
      <MuiSelect
        error={error}
        sx={{
          borderRadius: theme.common.input.shape.border_radius,
          ...sx,
        }}
        size={size}
        onChange={handleOnChange}
        value={value}
      >
        {options.map((option) => (
          <MenuItem key={option.name} value={option.value}>
            <BodyTypography_1>{option.name}</BodyTypography_1>
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default observer(Select);
