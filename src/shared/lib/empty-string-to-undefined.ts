// Функция для преобразования пустой строки в undefined
import { PropertyDraftSettings } from '../../features/draft-form/hooks/use-base-draft-property-form';
import { z } from 'zod';

export const emptyStringToUndefined = (value: string | undefined): string | undefined => {
  return value === '' ? undefined : value;
};

// Функция для преобразования описания черновика на основании длины и undefined поля
export const validateDescription = (value: string | undefined, ctx: any, name: string): string | undefined => {
  if (!value) {
    return emptyStringToUndefined(value);
  }

  if (value.length < PropertyDraftSettings.MIN_DESCRIPTION_LENGTH) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_small,
      type: z.ZodIssueCode.too_small,
      message: `Minimum of ${PropertyDraftSettings.MIN_DESCRIPTION_LENGTH} letters`,
    });

    return;
  }

  if (value.length > PropertyDraftSettings.MAX_DESCRIPTION_LENGTH) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: z.ZodIssueCode.too_big,
      message: `Maximum of ${PropertyDraftSettings.MAX_DESCRIPTION_LENGTH} letters`,
    });

    return;
  }

  return value === '' ? undefined : value;
};
