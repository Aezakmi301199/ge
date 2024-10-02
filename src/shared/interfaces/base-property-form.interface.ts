import { FieldValues } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PropertyData<T, F = FieldValues> {
  id: string;
  is_draft: boolean;
  city_id: string;
  building_id: string | null;
  district_id: string | null;
  microdistrict_id: string | null;
  type: string;
  type_fields: F;
  bitrix_deal_id: string | null;
  price?: number;
  status: string;
  description_en: string | null;
  description_ru: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
  category: string;
  creator_id: string;
  new_building_id: string | null;
  responsible_id: string;
}

// Перегрузка функции для создания объекта PropertyData
export function createPropertyData<T extends LowerCasePropertyType, F = FieldValues>(
  data: PropertyData<T, F>,
): PropertyData<T, F> {
  return data;
}

export const toUpperCase = <T extends string>(string: T) => {
  return string.toUpperCase();
};

export const toCapitalize = (str: string) => {
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const toLowerCase = <T extends string>(string: T) => {
  return string.toUpperCase();
};

export enum LowerCasePropertyType {
  APARTMENT = 'apartment',
  TOWNHOUSE = 'townhouse',
  VILLA = 'villa',
}
