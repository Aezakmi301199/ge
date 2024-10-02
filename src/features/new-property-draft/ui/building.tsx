import React from 'react';
import { ContainerBlock } from '../../../shared/ui-kit/styled';
import TransactionPropertySelector from './transaction-property-selector';
import { Stack, SxProps } from '@mui/material';
import TransactionChip, { optionTransactions } from '../../../shared/chip/transaction-chip';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { Controller, useFormContext } from 'react-hook-form';
import NumberInput from '../../../shared/input/number-input';

interface BuildingProps {
  buildingTypes?: optionTransactions[];
  showBuilding?: boolean;
  sx?: SxProps;
}

const defaultOptionsTransaction = [
  { name: 'Ready', value: 'Ready' },
  { name: 'Under construction', value: 'Under construction' },
];

const Building: React.FC<BuildingProps> = ({ buildingTypes = defaultOptionsTransaction, sx, showBuilding = false }) => {
  const { control } = useFormContext();
  const maxFloorCount = 500;
  const minFloorCount = 0;

  return (
    <ContainerBlock sx={sx}>
      <HeadlineTypography_6 pb={'7px'}>{t('Building')}</HeadlineTypography_6>
      {showBuilding && (
        <TransactionPropertySelector>
          {({ state, toggleBuildingType }) => (
            <Stack gap={'28px'}>
              <TransactionChip
                items={buildingTypes}
                selectedItem={state.buildingType}
                onSelectItem={toggleBuildingType}
                label='Building'
              />
            </Stack>
          )}
        </TransactionPropertySelector>
      )}
      <Controller
        name={'typeFields.floorCount'}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <NumberInput
            value={value}
            minValue={minFloorCount}
            maxValue={maxFloorCount}
            onChange={(e) => {
              onChange(e.floatValue);
            }}
            label={'Floors in the building'}
            error={!!error}
            required={false}
            helperText={'This field is required'}
          />
        )}
      />
    </ContainerBlock>
  );
};

export default Building;
