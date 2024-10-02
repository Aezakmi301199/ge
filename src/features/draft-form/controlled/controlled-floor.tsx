import { Controller, useFormContext } from 'react-hook-form';
import NumberInput from '../../../shared/input/number-input';
import { t } from 'i18next';
import React, { FC } from 'react';

type ControlledBathroomCountProps = {
  minValue?: number;
  maxValue?: number;
};

const ControlledFloor: FC<ControlledBathroomCountProps> = ({ minValue = 1, maxValue = 500 }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={'typeFields.floor'}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <NumberInput
          minValue={minValue}
          maxValue={maxValue}
          onChange={(e) => {
            onChange(e.floatValue);
          }}
          label={t('Floor')}
          error={!!error}
          value={value}
          required={false}
          helperText={'This field is required'}
        />
      )}
    />
  );
};

export default ControlledFloor;
