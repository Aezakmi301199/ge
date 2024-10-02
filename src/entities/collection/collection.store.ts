import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import {
  collectionControllerAddProperty,
  collectionControllerExpire,
  collectionControllerFindOne,
  collectionControllerRemoveProperty,
  collectionControllerRenewExpiration,
  collectionControllerUpdate,
  dealControllerCreateCollection,
  userControllerFindCollections,
  userControllerFindDeals,
} from '../../shared/api/generated-api/api';
import { ICollection } from '../../shared/interfaces/store/collection';
import {
  CollectionResponse,
  DealResponse,
  UserControllerFindDealsDealCategoryType,
} from '../../shared/api/generated-api/api.schemas';

export class CollectionStore implements ICollection<CollectionResponse> {
  @observable isLoading = false;
  @observable collection: CollectionResponse[] = [];
  @observable propertiesInCollection: CollectionResponse | null = null;
  @observable hasError = false;
  @observable deals: DealResponse[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async fetchData(isActive: boolean, userId: string | undefined) {
    if (!userId) {
      return;
    }

    this.isLoading = true;

    try {
      const response = await userControllerFindCollections(userId, { isActive });

      runInAction(() => {
        this.collection = response;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  }

  @action
  async getPropertiesInCollection(id: string) {
    this.isLoading = true;

    try {
      const response = collectionControllerFindOne(id);

      await runInAction(async () => {
        this.propertiesInCollection = await response;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  }

  @action
  async updateCollectionName(id: string, name: string) {
    this.isLoading = true;

    try {
      await collectionControllerUpdate(id, { name });

      runInAction(() => {
        if (this.propertiesInCollection) {
          this.propertiesInCollection = {
            ...this.propertiesInCollection,
            name: name,
          };
        }

        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  }

  @action
  deleteProperty = async (id: string | undefined, propertyId: string) => {
    if (!id) {
      return;
    }

    this.isLoading = true;

    try {
      await collectionControllerRemoveProperty(id, { id: propertyId });

      runInAction(() => {
        if (this.propertiesInCollection) {
          this.propertiesInCollection = {
            ...this.propertiesInCollection,
            properties: this.propertiesInCollection.properties.filter(
              (property) => property.property.id !== propertyId,
            ),
          };
        }

        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  };

  @action
  async createCollection(name: string, propertyIds: string[], dealId: number | null): Promise<string> {
    if (!dealId) {
      throw new Error('Deal id is required');
    }

    try {
      const response = await dealControllerCreateCollection(dealId, { name, propertyIds });

      runInAction(() => {
        this.propertiesInCollection = response;
        this.isLoading = false;
        this.hasError = false;
      });

      return response.id;
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
      throw error;
    }
  }

  @action
  async expireCollection(id: string) {
    this.isLoading = true;

    try {
      await collectionControllerExpire(id);
      runInAction(() => {
        this.collection = this.collection.filter((collection) => collection.id !== id);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  }

  @action
  async renewCollection(id: string) {
    this.isLoading = true;

    try {
      await collectionControllerRenewExpiration(id);
      runInAction(() => {
        this.collection = this.collection.filter((collection) => collection.id !== id);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  }

  @action
  async addPropertyToCollection(collectionId: string, propertyId: string): Promise<void> {
    if (!collectionId || !propertyId) {
      return;
    }

    this.isLoading = true;

    try {
      await collectionControllerAddProperty(collectionId, { id: propertyId });
      runInAction(() => {
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  }

  @action
  async fetchDeals(userId: string | undefined) {
    if (!userId) {
      return;
    }

    this.isLoading = true;

    try {
      const response = await userControllerFindDeals(userId, {
        dealCategoryType: UserControllerFindDealsDealCategoryType.BUY,
      });

      runInAction(() => {
        this.deals = response;
        this.isLoading = false;
        this.hasError = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
