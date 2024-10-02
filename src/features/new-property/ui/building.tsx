import React from 'react';
import { Stack } from '@mui/material';
import TransactionChip, { optionTransactions } from '../../../shared/chip/transaction-chip';
import TextInput from '../../../shared/input/text-input';
import { ContainerBlock } from '../../../shared/ui-kit/styled';
import TransactionPropertySelector from '../../new-property-draft/ui/transaction-property-selector';

interface BuildingProps {
  buildingTypes: optionTransactions[];
}

const Building: React.FC<BuildingProps> = ({ buildingTypes }) => {
  return (
    <ContainerBlock sx={{ width: '350px' }}>
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
      <TextInput required={false} label={'Floors in the building'} />
    </ContainerBlock>
  );
};

export default Building;
