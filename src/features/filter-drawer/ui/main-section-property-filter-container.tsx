import { useState, useEffect } from 'react';
import apiClient from '../../../api-client';
import { Amenity } from '../../../shared/api/generated-api/api.schemas';
import AmenitiesSection from './amenities-section';
import DescriptionSection from './description-section';
import LocationSection from './location-section';
import RoomAndBathroomSection from './room-and-bathroom-section';
import SharedSection from './shared-section';
import SwitchPropertySection from './switch-property-section';

export const amenities = [
  { name: 'Study', iconClass: 'icon icon-speech-to-text' },
  { name: 'ViewComponent of Water', iconClass: 'icon icon-water-view' },
  { name: 'Built in Wardrobes', iconClass: 'icon icon-builtin-wardrobes' },
  { name: 'Walk-in Closet', iconClass: 'icon icon-walkin-closet' },
  { name: "Children's Play Area", iconClass: 'icon icon-playground' },
  { name: "Children's Pool", iconClass: 'icon icon-kids-pool' },
  { name: 'Barbecue Area', iconClass: 'icon icon-bbq-area' },
  { name: 'Concierge', iconClass: 'icon icon-concierge' },
  { name: 'Covered Parking', iconClass: 'icon icon-covered-parking' },
  { name: 'Kitchen Appliances', iconClass: 'icon icon-kitchen-appliances' },
  { name: 'Pets Allowed', iconClass: 'icon icon-pets-allowed' },
  { name: 'Shared Pool', iconClass: 'icon icon-swimming-pool' },
  { name: 'Private Jacuzzi', iconClass: 'icon icon-private-jacuzzi' },
  { name: 'Shared Spa', iconClass: 'icon icon-shared-spa' },
  { name: 'Shared Gym', iconClass: 'icon icon-gym' },
  { name: 'Security', iconClass: 'icon icon-security' },
  { name: 'Private Pool', iconClass: 'icon icon-swimming-pool' },
  { name: 'Private Garden', iconClass: 'icon icon-private-garden' },
  { name: 'Private Gym', iconClass: 'icon icon-gym' },
];

const MainSectionPropertyFilterContainer = () => {
  const bedrooms = ['1', '2', '3', '4', '5', '6', '7', '7+'];
  const bathrooms = ['1', '2', '3', '4', '5', '6', '7', '7+'];
  const propertySize = ['sqm', 'sqft', 'sqm2', 'sqft2'];
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const fetch = () => {
    apiClient.get<Amenity[]>('/amenity').then((res) => setAmenities(res.data));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <LocationSection />
      <RoomAndBathroomSection bathrooms={bathrooms} bedrooms={bedrooms} />
      <SharedSection propertySize={propertySize} />
      <AmenitiesSection amenities={amenities} willSelect={true} />
      <DescriptionSection />
      <SwitchPropertySection />
    </>
  );
};

export default MainSectionPropertyFilterContainer;
