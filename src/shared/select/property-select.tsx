import React from 'react';
import { t } from 'i18next';
import { FormControl, MenuItem, Select, SxProps } from '@mui/material';
import { theme } from '../../theme';
import { BodyTypography_1 } from '../typography/ui/ui';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { observer } from 'mobx-react-lite';

interface PropertySelectProps extends Omit<SelectInputProps<string>, 'autoWidth' | 'multiple' | 'native'> {
  sx?: SxProps;
  values: string[];
}

const PropertySelect: React.FC<PropertySelectProps> = ({ values, sx, value, onChange }) => {
  return (
    <FormControl sx={{ display: 'contents' }}>
      <Select
        sx={{
          borderRadius: theme.common.input.shape.border_radius,
          ...sx,
        }}
        onChange={onChange}
        size={'small'}
        value={value}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            <BodyTypography_1>{t(value)}</BodyTypography_1>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default observer(PropertySelect);
