import React, { useEffect } from 'react';
import { Stack, SxProps } from '@mui/material';
import TransactionPropertySelector from '../../features/new-property-draft/ui/transaction-property-selector';
import TransactionChip, { optionTransactions } from '../chip/transaction-chip';
import { CapitalizeTransactionType } from '../enums/capitalize-transaction-type';
import { TransactionType } from '../enums/transaction-type';
import { State } from '../lib/reducer';
import { ContainerBlock } from '../ui-kit/styled';
import { debounce } from 'lodash';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';

interface PropertySelectorProps {
  transactions?: optionTransactions[];
  propertyTypes: optionTransactions[];
  onStateChange: (state: State) => void;
  defaultState?: State;
  transactionProps?: {
    sx?: SxProps;
  };
  sx?: SxProps;
}

const defaultOptionsTransaction = [
  { name: CapitalizeTransactionType.SALE, value: TransactionType.SALE },
  // Когда-нибудь понадобится (Не трогать)
  // { name: CapitalizeTransactionType.RENT, value: TransactionType.RENT },
];

const PropertySelector: React.FC<PropertySelectorProps> = ({
  transactions = defaultOptionsTransaction,
  propertyTypes,
  onStateChange,
  defaultState,
  transactionProps,
  sx,
}) => {
  return (
    <ContainerBlock sx={sx}>
      <TransactionPropertySelector defaultState={defaultState} applyUnSelect={false}>
        {({ state, toggleTransaction, togglePropertyType }) => {
          const debouncedOnStateChange = debounce(onStateChange, 300);
          useEffect(() => {
            debouncedOnStateChange(state);
          }, [state.propertyType, state.typeOfTransaction]);

          return (
            <Stack gap={'20px'}>
              <TransactionChip
                items={transactions}
                selectedItem={state.typeOfTransaction}
                onSelectItem={toggleTransaction}
                label={t('Type of transaction')}
                sx={transactionProps?.sx}
              />
              <TransactionChip
                items={propertyTypes}
                selectedItem={state.propertyType}
                onSelectItem={togglePropertyType}
                label={t('Property type')}
                sx={transactionProps?.sx}
              />
            </Stack>
          );
        }}
      </TransactionPropertySelector>
    </ContainerBlock>
  );
};

export default observer(PropertySelector);
