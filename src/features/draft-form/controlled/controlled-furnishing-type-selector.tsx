import React, { FC, useState } from 'react';
import TransactionChip, { optionTransactions } from '../../../shared/chip/transaction-chip';
import { Controller, useFormContext } from 'react-hook-form';
import { theme } from '../../../theme';
import TransactionChipStore from '../../../shared/store/transaction-chip.store';

interface ControlledFurnishingTypeSelectorProps {
  items?: optionTransactions[];
}

export enum FurnishingType {
  FURNISHED = 'FURNISHED',
  SEMI_FURNISHED = 'SEMI_FURNISHED',
  UNFURNISHED = 'UNFURNISHED',
}

export enum CapitalizeFurnishingType {
  FURNISHED = 'Furnished',
  SEMI_FURNISHED = 'Semi furnished',
  UNFURNISHED = 'Unfurnished',
}

const defaultOptionsFurnishingType = [
  { name: CapitalizeFurnishingType.FURNISHED, value: FurnishingType.FURNISHED },
  { name: CapitalizeFurnishingType.SEMI_FURNISHED, value: FurnishingType.SEMI_FURNISHED },
  { name: CapitalizeFurnishingType.UNFURNISHED, value: FurnishingType.UNFURNISHED },
];

const ControlledFurnishingTypeSelector: FC<ControlledFurnishingTypeSelectorProps> = ({
  items = defaultOptionsFurnishingType,
}) => {
  const { control } = useFormContext();
  const [transactionChipStore] = useState(() => new TransactionChipStore());

  return (
    <Controller
      name={'typeFields.furnishingType'}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TransactionChip
          items={items}
          selectedItem={value}
          onSelectItem={(value: string) => {
            transactionChipStore.toggleValue(value);
            onChange(transactionChipStore.value);
          }}
          stackProps={{
            sx: {
              gap: theme.base.module['2_5'],
            },
          }}
          label='Furnishing type'
        />
      )}
    />
  );
};

export default ControlledFurnishingTypeSelector;
