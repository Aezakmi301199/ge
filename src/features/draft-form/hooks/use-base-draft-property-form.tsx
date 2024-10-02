import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LanguageRegex } from '../../../shared/const/language-regex';
import { validateDescription } from '../../../shared/lib/empty-string-to-undefined';
import { BaseFilterDraft } from '../country/UAE-filter-draft-interface';
import { PropertyType } from '../../../shared/enums/property-type';
import { DealType } from '../../../shared/api/generated-api/api.schemas';

export enum PropertyDraftSettings {
  MAX_DESCRIPTION_LENGTH = 1500,
  MIN_DESCRIPTION_LENGTH = 100,
}

const descriptionEnData = z.object({
  descriptionEN: z
    .string()
    .transform((...props) => validateDescription(...props, 'descriptionEN'))
    .refine((val) => val === undefined || LanguageRegex.EN_WITH_NUMBERS_AND_SIGNS.test(val), {
      message: "Only a-z, 0-9 characters are allowed and '-', '_', '.' as separators",
    })
    .nullable(),
});

const descriptionRuData = z.object({
  descriptionRU: z
    .string()
    .transform((...props) => validateDescription(...props, 'descriptionRU'))
    .refine((val) => val === undefined || LanguageRegex.RU_WITH_NUMBERS_AND_SIGNS.test(val), {
      message: "Only а-я, 0-9 characters are allowed and '-', '_', '.' as separators",
    })
    .nullable()
    .optional(),
});

const documentSchema = z.object({
  key: z.string(),
  file: z.any(),
  fileType: z.string(),
});

export const documentsData = z.object({
  attachments: z.array(documentSchema),
});

export const baseDraftPropertyData = z
  .object({
    isDraft: z.boolean(),
    cityId: z.string(),
    bitrixDealId: z.number(),
    dealType: z.nativeEnum(DealType),
    buildingId: z.string().nullish(),
    districtId: z.string().nullish(),
    propertyType: z.nativeEnum(PropertyType),
    category: z.string(),
    price: z.number().nullable(),
    currencyId: z.string(),
    amenities: z.string().array(),
    views: z.string().array().optional(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
  })
  .and(descriptionEnData)
  .and(descriptionRuData);

export type BaseDraftProperty = z.infer<typeof baseDraftPropertyData>;

export const refineBaseDraftProperty = baseDraftPropertyData.superRefine((data, customError) => {
  if (!data.isDraft) {
    if (!data.price) {
      customError.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'null',
        path: ['price'],
        message: 'This field is required',
      });
    }

    if (!data.latitude || !data.longitude) {
      customError.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'null',
        path: ['latitude'],
        message: 'This field is required',
      });

      customError.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'null',
        path: ['longitude'],
        message: 'This field is required',
      });
    }

    if (!data.descriptionEN) {
      customError.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'null',
        path: ['descriptionEN'],
        message: 'This field is required',
      });
    }

    if (!data.descriptionRU) {
      customError.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'null',
        path: ['descriptionRU'],
        message: 'This field is required',
      });
    }
  }
});

type UseBaseFieldsFormProps<T extends PropertyType> = {
  filter?: BaseFilterDraft;
  defaultValue?: BaseFilterDraft;
};

const useBaseDraftPropertyForm = <T extends PropertyType>({ filter, defaultValue }: UseBaseFieldsFormProps<T>) => {
  const formMethods = useForm({
    mode: 'onChange',
    values: filter,
    defaultValues: defaultValue,
    shouldUseNativeValidation: true,
    resolver: zodResolver(refineBaseDraftProperty),
  });

  return formMethods;
};

export default useBaseDraftPropertyForm;
