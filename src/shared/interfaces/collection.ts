import { Property } from './property';
import { PropertyCollection } from '../api/generated-api/api.schemas';

interface PropertyItem {
  propertyId: string;
  property: Property;
}

export interface Collection {
  id: string;
  creatorDealId: number;
  bitrixTodoId: number;
  name: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  properties: PropertyItem[];
}

export interface CreateCollection {
  id: string;
  expiresAt: string;
  name: string;
  properties: PropertyCollection[];
}
