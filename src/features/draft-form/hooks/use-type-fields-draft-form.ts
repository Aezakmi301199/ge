import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { JSONSchemaType } from 'ajv';
import { PropertyType } from '../../../shared/enums/property-type';
import { PropertyResponseTypeFields } from '../../../shared/api/generated-api/api.schemas';
import { BaseAdditionalTypeFields } from '../country/UAE-filter-draft-interface';
import { CategoryType } from '../../../shared/enums/category-type';

type UseTypeFieldsFormProps<T extends BaseAdditionalTypeFields> = {
  filter?: UniversalDraftTypeFields<T>;
  defaultValue?: UniversalDraftTypeFields<T>;
  schema: JSONSchemaType<UniversalDraftSchema> | undefined;
};

export interface UniversalDraftSchema {
  isDraft: boolean;
  typeFields: PropertyResponseTypeFields;
  type: PropertyType;
}

export interface UniversalDraftTypeFields<T extends BaseAdditionalTypeFields> {
  isDraft: boolean;
  typeFields: T;
  propertyType: PropertyType;
  category: CategoryType;
}

export const useTypeFieldsDraftForm = <T extends BaseAdditionalTypeFields>({
  filter,
  defaultValue,
  schema,
}: UseTypeFieldsFormProps<T>) => {
  const formMethods = useForm({
    mode: 'all',
    values: filter,
    defaultValues: defaultValue,
    shouldUseNativeValidation: true,
    resolver: schema ? ajvResolver(schema) : undefined,
  });

  useEffect(() => {
    formMethods.trigger();
  }, [formMethods.trigger, schema]);

  return formMethods;
};
