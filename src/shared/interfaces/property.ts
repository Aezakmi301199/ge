import { AmenityResponse } from '../api/generated-api/api.schemas';

export interface Amenity extends AmenityResponse {}

interface PropertyAmenity {
  propertyId: string;
  amenityId: string;
  amenity: Amenity;
}

interface Country {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface City {
  id: string;
  countryId: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  country: Country;
}

interface Building {
  id: string;
  name: string;
  streetName: string;
  number: string;
  cityId: string;
  createdAt: string;
  updatedAt: string;
}

interface Responsible {
  id: string;
  bitrixUserId: number;
  portalUserId: number;
  portalId: string;
  roleId: string;
  surname: string;
  name: string;
  patronymic: string | null;
  email: string;
  photo: string;
  departments: number[];
  lastLoginAt: string;
  registeredAt: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface Attachment {
  id: string;
  propertyId: string;
  type: string;
  url: string;
  index: number;
  createdAt: string | null;
  domain: string;
}

interface TypeFields {
  size: number;
  floor: number;
  roomCount: number;
  floorCount: number;
  hasMaidRoom: boolean;
  bedroomCount: number;
  bathroomCount: number;
}

interface Views {
  propertyId: string;
  viewId: string;
  createdAt: string;
  view: {
    id: string;
    cityId: string;
    name: string;
    createdAt: string;
  };
}
