import { makeAutoObservable } from 'mobx';
import {
  cityControllerGetAvailableCurrencies,
  propertyControllerCreateDraft,
  propertyControllerGetDraft,
  propertyControllerUpdate,
  propertyControllerUploadAttachment,
} from '../generated-api/api';
import type {
  CreatePropertyDraftDto,
  CurrencyResponse,
  PropertyControllerGetDraftParams,
  PropertyDraftResponse,
  PropertyResponse,
  UpdatePropertyDto,
} from '../generated-api/api.schemas';
import { PropertyType } from '../../enums/property-type';
import { CategoryType } from '../../enums/category-type';
import { TransactionType } from '../../enums/transaction-type';
import { DocumentFile } from '../../../widgets/document-upload/document-upload-container';

export class PropertyController {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  static getDraft = async (params: PropertyControllerGetDraftParams): Promise<PropertyDraftResponse> => {
    return await propertyControllerGetDraft(params);
  };

  static createDraft = async (bodyParams: CreatePropertyDraftDto): Promise<PropertyResponse> => {
    return await propertyControllerCreateDraft(bodyParams);
  };

  static getAvailableCurrencies = async (cityId: string): Promise<CurrencyResponse[]> => {
    return await cityControllerGetAvailableCurrencies(cityId);
  };

  static createRequiredBodyDraft = (
    otherParams: Pick<CreatePropertyDraftDto, 'cityId' | 'dealId'>,
  ): CreatePropertyDraftDto => {
    return {
      propertyType: PropertyType.APARTMENT,
      category: CategoryType.SECONDARY,
      dealType: TransactionType.SALE,
      ...otherParams,
    };
  };

  static updateDraft = async (id: string | number, updatePropertyDto: UpdatePropertyDto) => {
    if (!updatePropertyDto.isDraft) {
      throw new Error('isDraft should be true for update property-draft in this static method');
    }

    await propertyControllerUpdate(id.toString(), updatePropertyDto);
  };

  static uploadAttachment = async (id: string, addAttachmentDto: DocumentFile) => {
    const file = addAttachmentDto.file;

    return await propertyControllerUploadAttachment(id.toString(), {
      file: new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type }),
      type: 'PHOTO',
    });
  };

  static updateProperty = async (id: string | number, updatePropertyDto: UpdatePropertyDto) => {
    if (updatePropertyDto.isDraft) {
      throw new Error('isDraft should be false for Property created in this static method');
    }

    await propertyControllerUpdate(id.toString(), updatePropertyDto);
  };
}
