import { t } from 'i18next';
import { ChipContainer } from '../../widgets/drawers/ui/ui';
import { Amenity, PropertyResponse } from '../api/generated-api/api.schemas';
import { ChipAmenity } from './ui/ui';
import React from 'react';

interface AmenitiesChipProps {
  amenities: Pick<PropertyResponse, 'propertyAmenity'> | Amenity[];
  willSelect: boolean;
}

const AmenitiesChip: React.FC<AmenitiesChipProps> = ({ amenities }) => {
  const amenityList = Array.isArray(amenities) ? amenities : amenities.propertyAmenity.map((prop) => prop.amenity);

  return (
    <ChipContainer>
      {amenityList.map((amenityItem) => (
        <ChipAmenity
          key={amenityItem.id}
          icon={<i className={`icon icon-${amenityItem.iconName}`} style={{ fontSize: '32px' }} />}
          label={t(amenityItem.name)}
        />
      ))}
    </ChipContainer>
  );
};

export default AmenitiesChip;
