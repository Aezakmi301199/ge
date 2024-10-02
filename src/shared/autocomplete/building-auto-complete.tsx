import React, { useEffect, useState } from 'react';
import AutoComplete, { AutoCompleteProps } from './auto-complete';
import { BuildingResponse } from '../api/generated-api/api.schemas';
import { action, makeAutoObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ListItem, ListItemText } from '@mui/material';

interface BuildingAutoCompleteProps
  extends Omit<AutoCompleteProps<BuildingResponse>, 'renderInput' | 'value' | 'onChange'> {
  value: string;
  onChange: (value: string, lngLatCoordinates: string[]) => void;
}

class BuildingAutoCompleteStore {
  @observable buildings: BuildingResponse[] = [];
  @observable selectedBuilding: BuildingResponse | null = null;

  constructor(buildings?: BuildingResponse[]) {
    if (Array.isArray(buildings)) {
      this.buildings = buildings;
    }
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  findOptionByBuildingId = (buildingId: string) => {
    return this.buildings.find((building) => building.id === buildingId) ?? null;
  };

  @action
  setSelectedBuilding = (building: BuildingAutoCompleteStore['selectedBuilding']) => {
    this.selectedBuilding = building;
  };

  @action
  setBuildings = (building: BuildingAutoCompleteStore['buildings']) => {
    this.buildings = building;
  };
}

const BuildingAutoComplete: React.FC<BuildingAutoCompleteProps> = ({
  id = 'buildingId',
  width,
  onChange,
  value,
  inputLabel = 'Building',
  error,
  required,
  options,
}) => {
  const [buildingAutoCompleteStore] = useState(() => new BuildingAutoCompleteStore());

  useEffect(() => {
    buildingAutoCompleteStore.setBuildings(options);
  }, [options]);

  return (
    <AutoComplete
      id={id}
      error={error}
      required={required}
      value={buildingAutoCompleteStore.findOptionByBuildingId(value)}
      isOptionEqualToValue={(option, selectedOption) => option.id === selectedOption.id}
      getOptionKey={(option) => option.id}
      options={options}
      getOptionLabel={(option) => {
        return option.name || '';
      }}
      onChange={(event, newValue) => {
        if (!newValue) {
          return;
        }
        buildingAutoCompleteStore.setSelectedBuilding(newValue);
        onChange(newValue.id, newValue.location.coordinates);
      }}
      renderOption={(props, option) => {
        return (
          <ListItem {...props}>
            <ListItemText primary={option.name} secondary={option.district} />
          </ListItem>
        );
      }}
      inputLabel={inputLabel}
      style={{ width: width }}
    />
  );
};

export default observer(BuildingAutoComplete);
