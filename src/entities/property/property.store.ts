import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { IProperty } from '../../shared/interfaces/store/property';
import {
  propertyControllerAddPublication,
  propertyControllerCreateShow,
  propertyControllerFindByFilter,
  propertyControllerFindById,
  propertyControllerUpdateStatus,
} from '../../shared/api/generated-api/api';
import {
  PropertyControllerFindByFilterCategory,
  PropertyControllerFindByFilterDealType,
  PropertyControllerFindByFilterOrderBy,
  PropertyControllerFindByFilterOrderDirection,
  PropertyControllerFindByFilterParams,
  PropertyControllerFindByFilterPropertyType,
  PropertyResponse,
  PropertyStatus,
  UpdatePropertyStatusDtoStatus,
} from '../../shared/api/generated-api/api.schemas';

export class PropertyStore implements IProperty<PropertyResponse> {
  @observable properties: PropertyResponse[] = [];
  @observable property: PropertyResponse | null = null;
  @observable isLoading: boolean = false;
  @observable private order: Pick<PropertyControllerFindByFilterParams, 'orderBy' | 'orderDirection'> = {
    orderBy: PropertyControllerFindByFilterOrderBy.createdAt,
    orderDirection: PropertyControllerFindByFilterOrderDirection.desc,
  };

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async fetchData(cityId: string | undefined) {
    if (!cityId) {
      return;
    }

    this.isLoading = true;

    try {
      const response = await propertyControllerFindByFilter({
        cityId,
        propertyType: PropertyControllerFindByFilterPropertyType.APARTMENT,
        category: PropertyControllerFindByFilterCategory.SECONDARY,
        dealType: PropertyControllerFindByFilterDealType.SALE,
        page: 1,
        ...this.order,
      });

      runInAction(() => {
        this.properties = response;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  async fetchPropertyById(id: string) {
    this.isLoading = true;

    try {
      const response = await propertyControllerFindById(id);

      runInAction(() => {
        this.property = response;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  async createShowing(id: string, dealId: number) {
    await propertyControllerCreateShow(id, { dealId });
  }

  @action
  async publishProperty(id: string | undefined, target: string) {
    if (!id) {
      return;
    }

    try {
      await propertyControllerAddPublication(id, { target: target });

      runInAction(() => {
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  async setActiveStatus() {
    if (!this.property) {
      return;
    }

    const property = await propertyControllerUpdateStatus(this.property.id, {
      status: UpdatePropertyStatusDtoStatus[PropertyStatus.ACTIVE],
    });

    runInAction(() => {
      this.property = property;
    });
  }

  @action
  async setToFixStatus() {
    if (!this.property) {
      return;
    }

    const property = await propertyControllerUpdateStatus(this.property.id, {
      status: UpdatePropertyStatusDtoStatus[PropertyStatus.TO_FIX],
    });

    runInAction(() => {
      this.property = property;
    });
  }

  @action
  resetProperty() {
    this.property = null;
  }

  @action
  setOrder(order: Pick<PropertyControllerFindByFilterParams, 'orderBy' | 'orderDirection'>) {
    this.order = order;
  }

  getOrder() {
    return this.order;
  }
}
