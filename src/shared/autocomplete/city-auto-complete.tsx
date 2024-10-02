import React, { useEffect, useState } from 'react';
import AutoComplete, { AutoCompleteProps } from './auto-complete';
import { CitiesPortals } from '../api/generated-api/api.schemas';
import { action, makeAutoObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';

export type AutoCompleteOptionDto = {
  id: string;
  label: string;
};

interface CityAutoCompleteProps extends Omit<AutoCompleteProps<CitiesPortals>, 'renderInput' | 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

class CityAutoCompleteStore {
  @observable citiesPortals: CitiesPortals[] = [];
  @observable selectedCityPortal: CitiesPortals | null = null;

  constructor(citiesPortals?: CitiesPortals[]) {
    if (Array.isArray(citiesPortals)) {
      this.citiesPortals = citiesPortals;
    }
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action findOptionByCityId = (cityId: string) => {
    return this.citiesPortals.find((cityPortal) => cityPortal.city.id === cityId) ?? null;
  };

  @action
  setSelectedCityPortal = (cityPortal: CityAutoCompleteStore['selectedCityPortal']) => {
    this.selectedCityPortal = cityPortal;
  };

  @action
  setCitiesPortals = (building: CityAutoCompleteStore['citiesPortals']) => {
    this.citiesPortals = building;
  };
}

const CityAutoComplete: React.FC<CityAutoCompleteProps> = ({
  id = 'cityId',
  width,
  onChange,
  value = '',
  inputLabel = 'City',
  error,
  required,
  options,
}) => {
  const [cityAutoCompleteStore] = useState(() => new CityAutoCompleteStore(options));

  useEffect(() => {
    cityAutoCompleteStore.setCitiesPortals(options);
  }, [options]);

  return (
    <AutoComplete
      id={id}
      required={required}
      error={error}
      value={cityAutoCompleteStore.findOptionByCityId(value)}
      getOptionKey={(option) => option.city.id}
      options={options}
      onChange={(event, newValue) => {
        cityAutoCompleteStore.setSelectedCityPortal(newValue);
        onChange(newValue?.city.id || '');
      }}
      inputLabel={inputLabel}
      getOptionLabel={(option: CitiesPortals) => {
        return option.city.name || '';
      }}
      renderOption={(props, option: CitiesPortals) => {
        return <li {...props}>{option.city.name}</li>;
      }}
      style={{ width: width }}
    />
  );
};

export default observer(CityAutoComplete);
