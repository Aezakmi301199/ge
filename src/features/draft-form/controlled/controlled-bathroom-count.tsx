import { Controller, useFormContext } from 'react-hook-form';
import NumberInput from '../../../shared/input/number-input';
import { t } from 'i18next';
import React, { FC } from 'react';

type ControlledBathroomBlockProps = {
  minValue?: number;
  maxValue?: number;
  required: boolean;
};

const ControlledBathroomBlock: FC<ControlledBathroomBlockProps> = ({ minValue = 1, maxValue = 20, required }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={'typeFields.bathroomCount'}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <NumberInput
          minValue={minValue}
          maxValue={maxValue}
          onChange={(e) => {
            onChange(e.floatValue);
          }}
          label={t('Bathrooms')}
          error={!!error}
          value={value}
          required={required}
          showErrorText={true}
          helperText={'This field is required'}
        />
      )}
    />
  );
};

export default ControlledBathroomBlock;
