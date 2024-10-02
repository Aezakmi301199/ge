import { Controller, useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';
import DealAutoComplete from '../../../shared/autocomplete/deal-auto-complete';
import FormControlLabel from '../../../shared/label/form-control-label';
import { observer } from 'mobx-react-lite';
import { DealResponse } from '../../../shared/api/generated-api/api.schemas';
import { FC } from 'react';

interface ControlledDealAutocompleteProps {
  deals: DealResponse[];
  loading?: boolean;
}

const ControlledDealAutocomplete: FC<ControlledDealAutocompleteProps> = ({ deals, loading }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={'bitrixDealId'}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Stack sx={{ gap: '8px' }}>
            <FormControlLabel gutterBottom={false} labelPlacement='top' required={true} label={'Deal'} />
            <DealAutoComplete
              loading={loading}
              onChange={onChange}
              value={value}
              error={false}
              required={false}
              deals={deals}
              selectedDealId={value}
              setSelectedDealId={onChange}
            />
          </Stack>
        );
      }}
    />
  );
};

export default observer(ControlledDealAutocomplete);
