import React, { useEffect, useState } from 'react';
import AutoComplete, { AutoCompleteProps } from './auto-complete';
import { action, makeAutoObservable, observable } from 'mobx';
import { District } from '../api/generated-api/api.schemas';
import { observer } from 'mobx-react-lite';

interface DistrictAutoCompleteProps extends Omit<AutoCompleteProps<District>, 'renderInput' | 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

class DistrictAutoCompleteStore {
  @observable districts: District[] = [];
  @observable selectedDistrict: District | null = null;

  constructor(districts?: District[]) {
    if (Array.isArray(districts)) {
      this.districts = districts;
    }
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  findOptionByBuildingId = (buildingId: string) => {
    return this.districts.find((building) => building.id === buildingId) ?? null;
  };

  @action
  setSelectedBuilding = (building: DistrictAutoCompleteStore['selectedDistrict']) => {
    this.selectedDistrict = building;
  };

  @action
  setBuildings = (building: DistrictAutoCompleteStore['districts']) => {
    this.districts = building;
  };
}

const DistrictAutoComplete: React.FC<DistrictAutoCompleteProps> = ({
  id = 'districtId',
  width,
  onChange,
  value = '',
  inputLabel = 'District',
  error,
  required,
  options,
}) => {
  const [districtAutoCompleteStore] = useState(() => new DistrictAutoCompleteStore());

  useEffect(() => {
    districtAutoCompleteStore.setBuildings(options);
  }, [options]);

  return (
    <AutoComplete
      id={id}
      error={error}
      required={required}
      value={districtAutoCompleteStore.findOptionByBuildingId(value)}
      isOptionEqualToValue={(option, selectedOption) => option.id === selectedOption.id}
      getOptionKey={(option) => option.id}
      options={options}
      getOptionLabel={(option) => {
        return option.name || '';
      }}
      onChange={(event, newValue) => {
        districtAutoCompleteStore.setSelectedBuilding(newValue);
        onChange(newValue?.id || '');
      }}
      renderOption={(props, option) => {
        return <li {...props}>{option.name}</li>;
      }}
      inputLabel={inputLabel}
      style={{ width: width }}
    />
  );
};

export default observer(DistrictAutoComplete);
