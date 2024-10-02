import React, { useEffect, useState } from 'react';
import { ChipContainer } from '../../widgets/drawers/ui/ui';
import { Amenity } from '../interfaces/property';
import { observer } from 'mobx-react-lite';
import { ToggleChip } from '../chip/toggle-chip/toggle-chip';
import { action, makeAutoObservable, observable } from 'mobx';

interface AmenitiesChipProps {
  amenities: Amenity[];
  onToggle?: (amenities: string[]) => void;
  willSelect: boolean;
  value: string[];
}

class ToggleAmenitiesButtonStore {
  @observable values: string[] = [];
  @observable amenities: Amenity[] = [];

  constructor(values: string[], amenities: Amenity[]) {
    if (Array.isArray(amenities)) {
      this.amenities = amenities;
      this.values = values;
    }
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  onToggle = (newAmenity: Amenity) => {
    const index = this.values.indexOf(newAmenity.id);
    if (index !== -1) {
      this.values.splice(index, 1);
    } else {
      this.values.push(newAmenity.id);
    }
  };

  get getPrimitiveValue() {
    return this.values;
  }

  @action
  hasSelected(amenityId: string) {
    return this.values.indexOf(amenityId) !== -1;
  }

  @action
  findAmenitiesByValueString = (value: string[]) => {
    return this.amenities.filter((amenity) => value.includes(amenity.id));
  };

  @action
  setValues(values: string[]) {
    return (this.values = values);
  }

  get selectedAmenities() {
    return this.findAmenitiesByValueString(this.values);
  }
}

const ToggleAmenitiesButton: React.FC<AmenitiesChipProps> = ({ amenities, willSelect, onToggle, value = [] }) => {
  const [toggleAmenitiesButtonStore] = useState(() => new ToggleAmenitiesButtonStore(value, amenities));
  const handleToggleSelect = (amenityName: Amenity) => {
    toggleAmenitiesButtonStore.onToggle(amenityName);
    onToggle && onToggle(toggleAmenitiesButtonStore.getPrimitiveValue);
  };

  useEffect(() => {
    toggleAmenitiesButtonStore.setValues(value);
  }, [value]);

  return (
    <ChipContainer>
      {amenities.map((amenity) => (
        <ToggleChip
          key={amenity.id}
          checked={toggleAmenitiesButtonStore.hasSelected(amenity.id)}
          willSelect={true}
          icon={<i className={`icon icon-${amenity.iconName}`} style={{ fontSize: '24px' }} />}
          onClick={() => (willSelect ? handleToggleSelect(amenity) : undefined)}
          onDelete={toggleAmenitiesButtonStore.hasSelected(amenity.id) ? () => handleToggleSelect(amenity) : undefined}
          name={amenity.name}
        />
      ))}
    </ChipContainer>
  );
};

export default observer(ToggleAmenitiesButton);
