import { Controller, useFormContext } from 'react-hook-form';
import { Box, Stack } from '@mui/material';
import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import PropertySelect from '../../../../shared/select/property-select';
import NumberInput from '../../../../shared/input/number-input';
import ConfigAreaStore from '../../../../shared/store/config-area-store';
import { match } from 'ts-pattern';
import { t } from 'i18next';
import { ErrorTypography } from '../../../../shared/ui-kit/styled';

interface ControlledSizeBlockProps {
  minValue?: number;
  maxValue: number;
  required: boolean;
  name: string;
  label: string;
  onChangeConvertedValue?: (value: number | undefined) => void;
}

const ControlledConfigAreaProperty: FC<ControlledSizeBlockProps> = ({
  minValue,
  maxValue,
  required,
  name,
  label,
  onChangeConvertedValue,
}) => {
  const { control, watch, getFieldState } = useFormContext();
  const [configAreaStore] = useState(() => new ConfigAreaStore({ area: undefined, unit: 'sqm', maxValue }));
  const watcherValue = watch(name);
  const error = getFieldState(name).error;
  return (
    <Stack>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <NumberInput
                minValue={minValue}
                maxValue={maxValue}
                value={value}
                onChange={(e) => {
                  onChange(e.floatValue);
                  configAreaStore.onChangeArea(e.floatValue);
                  onChangeConvertedValue &&
                    onChangeConvertedValue(
                      configAreaStore.getAreaByCoefficient(configAreaStore.area, configAreaStore.unit),
                    );
                }}
                label={label}
                error={!!error}
                required={required}
              />
            );
          }}
        />
        <PropertySelect
          value={configAreaStore.unit}
          values={['sqm', 'sqft']}
          onChange={(...props) => {
            configAreaStore.onChangeUnit(...props);
            onChangeConvertedValue &&
              onChangeConvertedValue(configAreaStore.getAreaByCoefficient(watcherValue, configAreaStore.unit));
          }}
          sx={{ width: '100px' }}
        />
      </Box>
      {match({ showPromptText: false, showErrorText: true, hasError: Boolean(error) })
        .with({ showPromptText: true }, () => null)
        .with({ showErrorText: true, hasError: true }, () => (
          <ErrorTypography mt={'4px'}>{t('This field is required')}</ErrorTypography>
        ))
        .otherwise(() => null)}
    </Stack>
  );
};

export default observer(ControlledConfigAreaProperty);
