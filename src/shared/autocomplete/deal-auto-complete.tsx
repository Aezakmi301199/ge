import React from 'react';
import AutoComplete from './auto-complete';
import { observer } from 'mobx-react-lite';
import { DealResponse } from '../api/generated-api/api.schemas';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { createFilterOptions, SxProps } from '@mui/material';

interface DealAutoCompleteProps {
  id?: string;
  width?: string;
  deals: DealResponse[];
  selectedDealId: number | null;
  setSelectedDealId: (id: number | null) => void;
  inputLabel?: string;
  error?: boolean;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<unknown>, newValue: DealResponse | null) => void;
  value?: DealResponse | null | string;
  options?: DealResponse[];
  sx?: SxProps;
  loading?: boolean;
}

export class DealAutoCompleteStore {
  @observable deals: DealResponse[] = [];
  @observable selectedDeal: DealResponse | null = null;

  constructor(deals?: readonly DealResponse[]) {
    if (Array.isArray(deals)) {
      this.deals = deals;
    }
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @computed
  get selectedDealId() {
    return this.selectedDeal ? this.selectedDeal.id : null;
  }

  get modifiedDeals() {
    return this.transformToCorrectTypeDeals(this.deals);
  }

  @action findModifiedDeal = (dealId: number | null) => {
    return this.modifiedDeals.find((deal) => deal.id === dealId) ?? null;
  };

  @action
  setSelectedDeal = (dealId: DealAutoCompleteStore['selectedDeal']) => {
    this.selectedDeal = dealId;
  };

  @action
  setDeals = (deals: DealAutoCompleteStore['deals']) => {
    this.deals = deals;
  };

  @action
  transformToCorrectTypeDeals = (deals: DealResponse[]) => deals.map((deal) => ({ ...deal, id: Number(deal.id) }));
}

const DealAutoComplete: React.FC<DealAutoCompleteProps> = ({
  id = 'dealId',
  width,
  selectedDealId = null,
  inputLabel = 'Deal number or client',
  error,
  required = false,
  loading = false,
  setSelectedDealId,
  deals,
}) => {
  const filterOptionsById = createFilterOptions<DealResponse>({
    matchFrom: 'start',
    stringify: (option) => `${option.id}`,
  });

  const filterOptionsByTitle = createFilterOptions<DealResponse>({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });

  return (
    <AutoComplete<DealResponse>
      id={id}
      required={required}
      error={error}
      value={deals.find((deal) => deal.id === selectedDealId?.toString()) || null}
      getOptionKey={(option) => option.id}
      options={deals}
      filterOptions={(...params) => {
        const optionsById = filterOptionsById(...params);
        const optionsByTitle = filterOptionsByTitle(...params);
        return optionsById.length ? optionsById : optionsByTitle;
      }}
      loading={loading}
      onChange={(event, newValue) => {
        if (newValue && typeof newValue === 'object' && 'id' in newValue) {
          setSelectedDealId(Number(newValue.id));
        }
      }}
      inputLabel={inputLabel}
      getOptionLabel={(option) => {
        return `${option.title} (${option.id})` || option?.toString() || '';
      }}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <li key={key} {...otherProps}>
            {option.title} ({option.id})
          </li>
        );
      }}
      style={{ width: width }}
    />
  );
};

export default observer(DealAutoComplete);
