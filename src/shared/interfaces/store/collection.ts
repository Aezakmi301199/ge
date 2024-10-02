import { CreateCollection } from '../collection';

export interface ICollection<CollectionResponse> {
  collection: CollectionResponse[];
  isLoading: boolean;
  propertiesInCollection: CreateCollection | null;

  fetchData: (isActive: boolean, userId: string) => Promise<void>;
  getPropertiesInCollection: (id: string) => Promise<void>;
  updateCollectionName: (id: string, name: string) => Promise<void>;
  deleteProperty: (id: string, propertyId: string) => Promise<void>;
  createCollection: (name: string, properties: string[], dealId: number) => Promise<string>;
  expireCollection: (id: string) => Promise<void>;
  renewCollection: (id: string) => Promise<void>;
  addPropertyToCollection: (collectionId: string, propertyId: string) => Promise<void>;
}
