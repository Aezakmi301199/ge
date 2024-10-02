import React, { FC, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import { Box, Stack } from '@mui/material';
import { theme } from '../../../theme';
import NumberInput from '../../../shared/input/number-input';
import { t } from 'i18next';
import FormControlLabel from '../../../shared/label/form-control-label';
import Switch from '../../../shared/switch/switch';
import { PropertyType } from '../../../shared/enums/property-type';
import SwitchStore from '../../../shared/store/switch-store';
import { observer, useLocalStore } from 'mobx-react-lite';
import { match, P } from 'ts-pattern';
import { ErrorTypography } from '../../../shared/ui-kit/styled';
import { getCssFakeDisabled } from '../../../shared/lib/mui/get-pointer-events-none';

type ControlledBedroomBlockProps = {
  minValue?: number;
  maxValue?: number;
  required: boolean;
};

const ControlledBedroomBlock: FC<ControlledBedroomBlockProps> = ({ minValue = 1, maxValue = 20, required }) => {
  const { control, watch, getFieldState } = useFormContext();
  const [switchStore] = useState(() => new SwitchStore());
  const propertyType = watch('propertyType');
  const showStudio = Boolean(propertyType === PropertyType.APARTMENT);
  const bedroomError = getFieldState('typeFields.bedroomCount').error;
  const studioCount = 0;
  const oldValue = useLocalStore<{ bedroomCount: undefined | number }>(() => ({ bedroomCount: undefined }));
  const name = 'typeFields.bedroomCount';
  const { field } = useController({
    name,
    control,
  });

  return (
    <Stack>
      <Box sx={{ display: 'flex', gap: theme.base.module['2'] }}>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            const visibleValue = match({ value: value, oldValue })
              .with({ oldValue: { bedroomCount: 0 } }, () => undefined)
              .with({ oldValue: { bedroomCount: P.number } }, () => oldValue.bedroomCount)
              .with({ value: 0 }, () => {
                oldValue.bedroomCount = studioCount;
                onChange(studioCount);
                return undefined;
              })
              .otherwise(() => field.value);

            return (
              <NumberInput
                minValue={minValue}
                maxValue={maxValue}
                value={visibleValue}
                onChange={(e) => {
                  onChange(e.floatValue);
                }}
                label={t('Bedrooms')}
                error={!!error}
                required={required}
                sx={{ ...(switchStore.checked && getCssFakeDisabled()) }}
              />
            );
          }}
        />
        {showStudio && (
          <FormControlLabel
            label={t('Studio')}
            labelPlacement={'start'}
            sx={{
              '.MuiTypography-root': {
                fontWeight: 400,
              },
            }}
            control={
              <Switch
                checked={switchStore.checked}
                onChange={(event, checked) => {
                  switchStore.onChange(event, checked);
                  if (checked) {
                    oldValue.bedroomCount = studioCount;
                    field.onChange(studioCount);
                    return;
                  }

                  field.onChange(oldValue.bedroomCount);
                }}
                disabled={!showStudio}
              />
            }
            gutterBottom={false}
          />
        )}
      </Box>
      {match({ showPromptText: false, showErrorText: true, hasError: Boolean(bedroomError) })
        .with({ showPromptText: true }, () => null)
        .with({ showErrorText: true, hasError: true }, () => (
          <ErrorTypography mt={'4px'}>{t('This field is required')}</ErrorTypography>
        ))
        .otherwise(() => null)}
    </Stack>
  );
};

export default observer(ControlledBedroomBlock);
