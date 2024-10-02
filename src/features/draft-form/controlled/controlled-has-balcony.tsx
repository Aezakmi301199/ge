import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Switch from '../../../shared/switch/switch';
import FormControlLabel from '../../../shared/label/form-control-label';
import { observer } from 'mobx-react-lite';

export const ControlledHasBalcony = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={'typeFields.hasBalcony'}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormControlLabel
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexGrow: '1',
          }}
          control={
            <Switch
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          }
          label={'Balcony'}
          labelPlacement={'start'}
          gutterBottom={false}
        />
      )}
    />
  );
};
export default observer(ControlledHasBalcony);
