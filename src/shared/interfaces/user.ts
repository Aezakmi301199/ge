import { UserStatuses } from '../enums/user-status.enum';

interface Country {
  name: string;
}

interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country: Country;
}

interface CityPortal {
  city: City;
}

interface UserRole {
  name: string;
  isDefault: boolean;
}

interface UserPortal {
  citiesPortals: CityPortal[];
}

export interface User {
  id: string;
  portalUserId: number;
  surname: string;
  name: string;
  patronymic: string | null;
  photo: string;
  status: UserStatuses;
  role: UserRole;
  portal: UserPortal;
}
