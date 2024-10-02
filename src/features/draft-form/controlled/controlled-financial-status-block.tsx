import React, { CSSProperties, FC, useState } from 'react';
import TransactionChip from '../../../shared/chip/transaction-chip';
import { Controller, useFormContext } from 'react-hook-form';
import TransactionChipStore from '../../../shared/store/transaction-chip.store';
import { Stack, SxProps } from '@mui/material';
import { theme } from '../../../theme';
import { ContainerBlock } from '../../../shared/ui-kit/styled';

enum FinancialStatus {
  CASH = 'CASH',
  MORTGAGE = 'MORTGAGE',
}

enum CapitalizeFinancialStatus {
  CASH = 'Cash',
  MORTGAGE = 'Mortgage',
}

const defaultOptionFinancialStatuses = [
  { name: CapitalizeFinancialStatus.CASH, value: FinancialStatus.CASH },
  { name: CapitalizeFinancialStatus.MORTGAGE, value: FinancialStatus.MORTGAGE },
];

interface ControlledFinancialStatusBlockProps {
  sx?: SxProps;
}

const ControlledFinancialStatusBlock: FC<ControlledFinancialStatusBlockProps> = ({ sx }) => {
  const { control } = useFormContext();
  const [transactionChipStore] = useState(() => new TransactionChipStore());

  return (
    <Controller
      name={'typeFields.financialStatus'}
      control={control}
      render={({ field: { value, onChange } }) => (
        <ContainerBlock sx={sx}>
          <TransactionChip
            items={defaultOptionFinancialStatuses}
            selectedItem={value}
            onSelectItem={(value: string) => {
              transactionChipStore.toggleValue(value);
              onChange(transactionChipStore.value);
            }}
            label='Financial status'
          />
        </ContainerBlock>
      )}
    />
  );
};

export default ControlledFinancialStatusBlock;
