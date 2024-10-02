import { User } from './user';
import { ActionTypes } from '../enums/action-types.enum';
import { CurrencyISOLetters } from '../api/generated-api/api.schemas';

interface AmenityItem {
  id: string;
  name: string;
  iconName: string;
}

export interface AmenityHistory {
  amenityId: string;
  propertyId: string;
  amenity: AmenityItem;
}

interface Building {
  id: string;
  name: string;
  streetName: string;
}

export interface PropertyHistoryBuilding {
  actionType: ActionTypes;
  data: {
    key: string;
    newValue: Building;
    oldValue: Building;
  };
  createdAt: string;
  updater: User;
}

interface View {
  id: string;
  name: string;
}

export interface ViewItem {
  view: View;
}

export interface PropertyHistoryView {
  actionType: ActionTypes;
  data: {
    key: string;
    newValue: ViewItem[];
    oldValue: ViewItem[];
  };
  createdAt: string;
  updater: User;
}

export interface ResponsibleChangedHistory {
  actionType: ActionTypes;
  data: {
    oldUser: UserResponsible;
    newUser: UserResponsible;
  };
  createdAt: string;
  updater: UserResponsible | null;
}

interface UserResponsible {
  id: string;
  portalUserId: number;
  surname: string;
  name: string;
  patronymic: string | null;
  photo: string | null;
  status: string;
  role: {
    name: string;
  };
}

export interface PropertyHistoryCurrency {
  id: string;
  isoLetters: CurrencyISOLetters;
}

export interface PropertyHistory {
  actionType: ActionTypes;
  data: {
    key: string;
    newValue: string | number | AmenityHistory[] | Building | PropertyHistoryCurrency;
    oldValue: string | number | AmenityHistory[] | Building | PropertyHistoryCurrency;
  };
  createdAt: string;
  updater: User;
}
