import { action, makeAutoObservable, observable } from 'mobx';
import {
  DealType,
  Property,
  PropertyCategory,
  PropertyStatus,
  PropertyType,
} from '../../../shared/api/generated-api/api.schemas';
import { cloneDeep } from 'lodash';

export interface BaseAdditionalTypeFields {
  title?: string;
}

interface ApartmentFields extends BaseAdditionalTypeFields {
  bedroomCount: number;
  bathroomCount: number | null;
  size: number;
  unitNumber: string;
  hasBalcony?: boolean;
  floor?: number;
}

interface BungalowFields extends BaseAdditionalTypeFields {
  bedroomCount: number;
  bathroomCount: number | null;
  size: number;
  unitNumber: string;
  hasBalcony?: boolean;
  floor?: number;
}

interface LandFields extends BaseAdditionalTypeFields {
  plotSize?: number;
}

interface VillaFields extends BaseAdditionalTypeFields {
  bedroomCount: number;
  bathroomCount: number | null;
  size: number;
  plotSize: number;
  hasMaidRoom?: boolean;
}

export type AdditionalUAETypeFields<T extends PropertyType> = T extends PropertyType.APARTMENT
  ? ApartmentFields
  : T extends PropertyType.VILLA | PropertyType.TOWNHOUSE
    ? VillaFields
    : T extends
          | PropertyType.BUNGALOW
          | PropertyType.COMPOUND
          | PropertyType.DUPLEX
          | PropertyType.HALF_FLOOR
          | PropertyType.FULL_FLOOR
          | PropertyType.PENTHOUSE
          | PropertyType.WHOLE_BUILDING
          | PropertyType.BULK_UNITS
      ? BungalowFields
      : T extends PropertyType.LAND
        ? LandFields
        : BaseAdditionalTypeFields;

export interface BaseFilterDraft extends Omit<Property, 'typeFields'> {
  views: string[];
  amenities: string[];
}

export class BaseFilterDraftConfiguration {
  data: BaseFilterDraft = {
    bitrixDealId: null,
    buildingId: null,
    category: PropertyCategory.SECONDARY,
    cityId: '',
    createdAt: new Date().toISOString(),
    creatorId: '',
    currencyId: null,
    descriptionEN: null,
    descriptionRU: null,
    districtId: null,
    id: '',
    isDraft: true,
    latitude: null,
    longitude: null,
    microdistrictId: null,
    newBuildingId: null,
    portalId: '',
    price: null,
    propertyType: PropertyType.APARTMENT,
    responsibleId: '',
    status: PropertyStatus.ACTIVE,
    updatedAt: new Date().toISOString(),
    dealType: DealType.SALE,
    views: [],
    amenities: [],
  };

  constructor(data?: BaseFilterDraft) {
    if (data) {
      this.data = data;
    }

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  convertTypeFieldsToApi = (filter: BaseFilterDraft) => {
    const {
      category,
      cityId,
      currencyId,
      bitrixDealId,
      descriptionEN,
      propertyType,
      descriptionRU,
      views,
      isDraft,
      latitude,
      longitude,
      price,
      amenities,
      ...otherFilters
    } = filter;
    return {
      ...otherFilters,
      ...(amenities && { amenities }),
      ...(category && { category }),
      cityId,
      ...(currencyId && { currencyId }),
      ...(bitrixDealId && { dealId: bitrixDealId }),
      ...(descriptionEN && { descriptionEN }),
      ...(descriptionRU && { descriptionRU }),
      isDraft,
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      price,
      ...(propertyType && { propertyType }),
      status: PropertyStatus.PRE_LISTING,
      ...(views && { views }),
    };
  };

  @action
  setData = (data: BaseFilterDraftConfiguration['data']) => {
    this.data = data;
  };

  @action
  setFieldValue = <K extends keyof BaseFilterDraft>(field: K, value: BaseFilterDraft[K]) => {
    this.data[field] = value;
  };

  @action
  transformAttachmentsToValue = <K extends keyof BaseFilterDraft>(field: K, value: BaseFilterDraft[K]) => {
    this.data[field] = value;
  };
}

export type MatchResultUAEFilter =
  | { propertyType: PropertyType.APARTMENT; typeFields: AdditionalUAETypeFields<PropertyType.APARTMENT> }
  | {
      propertyType: PropertyType.VILLA | PropertyType.TOWNHOUSE;
      typeFields: AdditionalUAETypeFields<PropertyType.VILLA>;
    }
  | {
      propertyType:
        | PropertyType.BUNGALOW
        | PropertyType.COMPOUND
        | PropertyType.DUPLEX
        | PropertyType.HALF_FLOOR
        | PropertyType.FULL_FLOOR
        | PropertyType.PENTHOUSE
        | PropertyType.WHOLE_BUILDING
        | PropertyType.BULK_UNITS;
      typeFields: AdditionalUAETypeFields<PropertyType.BUNGALOW>;
    }
  | { propertyType: PropertyType.LAND; typeFields: AdditionalUAETypeFields<PropertyType.LAND> };

export abstract class FilterDraftConfiguration {
  public abstract factoryTypeFields<T extends PropertyType>(
    propertyType: T,
    props: BaseAdditionalTypeFields,
  ): AdditionalUAETypeFields<T>;
}

export class FilterUAEDraftConfiguration extends FilterDraftConfiguration {
  private filter: BaseFilterDraft = {} as BaseFilterDraft;
  @observable convertedSize: number | undefined = undefined;
  @observable convertedPlotSize: number | undefined = undefined;

  public getFilter = () => {
    return this.filter;
  };

  setFilter = (filter: BaseFilterDraft) => {
    this.filter = filter;
  };

  public factoryTypeFields<T extends PropertyType>(propertyType: T, props?: BaseAdditionalTypeFields) {
    const newTypeFields = this.getTypeFields(propertyType);
    return cloneDeep({
      ...newTypeFields,
      ...props,
    });
  }

  public getTypeFields<T extends PropertyType>(propertyType: T): AdditionalUAETypeFields<T> {
    const villaCommonFields = {
      bedroomCount: undefined,
      bathroomCount: undefined,
      size: undefined,
      plotSize: undefined,
      hasMaidRoom: false,
    };
    const bungalowCommonFields = {
      bedroomCount: undefined,
      bathroomCount: undefined,
      size: undefined,
      plotSize: undefined,
      hasMaidRoom: false,
    };

    const typeFieldsMap: Record<PropertyType, BaseAdditionalTypeFields & Record<string, any>> = {
      APARTMENT: {
        bedroomCount: undefined,
        bathroomCount: undefined,
        size: undefined,
        unitNumber: undefined,
        hasBalcony: false,
        hasMaidRoom: false,
        floor: undefined,
      },
      VILLA: villaCommonFields,
      TOWNHOUSE: villaCommonFields,
      BUNGALOW: bungalowCommonFields,
      COMPOUND: bungalowCommonFields,
      DUPLEX: bungalowCommonFields,
      HALF_FLOOR: bungalowCommonFields,
      FULL_FLOOR: bungalowCommonFields,
      PENTHOUSE: bungalowCommonFields,
      WHOLE_BUILDING: bungalowCommonFields,
      BULK_UNITS: bungalowCommonFields,
      LAND: {},
    };

    return cloneDeep(typeFieldsMap[propertyType as PropertyType]) as AdditionalUAETypeFields<T>;
  }

  @action
  convertTypeFieldsToApi<T extends PropertyType>(propertyType: T, typeFields: AdditionalUAETypeFields<T>) {
    return {
      ...typeFields,
      ...(this.convertedSize && { size: this.convertedSize }),
      ...(this.convertedPlotSize && { plotSize: this.convertedPlotSize }),
    };
  }

  @action
  handleConvertedSize = (convertedSize: number | undefined) => {
    this.convertedSize = convertedSize;
  };

  @action
  handleConvertedPlotSize = (convertedPlotSize: number | undefined) => {
    this.convertedPlotSize = convertedPlotSize;
  };

  @action
  resetConvertedValues = () => {
    this.convertedSize = undefined;
    this.convertedPlotSize = undefined;
  };
}
