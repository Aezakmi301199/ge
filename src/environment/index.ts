import { z } from 'zod';
import { AppEnv } from '../shared/enums/app-env.enum';

const message = 'Must be a valid type';

export const Environments = z.object({
  VITE_APP_ENV: z.nativeEnum(AppEnv).refine((value) => Object.values(AppEnv).includes(value), { message: message }),
  VITE_BITRIX_URL: z.string().url({ message: message }),
  VITE_BITRIX_CDN: z.string().url({ message: message }),
  VITE_ESOFT_CDN: z.string().url({ message: message }),
  VITE_LASTNAME: z.string().startsWith('/'),
  VITE_TEMP_TOKEN: z.string(),
});

type Environment = z.TypeOf<typeof Environments>;

const ensureEnvironments = (): Environment => {
  return Environments.parse({
    VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
    VITE_BITRIX_URL: import.meta.env.VITE_BITRIX_URL,
    VITE_BITRIX_CDN: import.meta.env.VITE_BITRIX_CDN,
    VITE_ESOFT_CDN: import.meta.env.VITE_ESOFT_CDN,
    VITE_LASTNAME: import.meta.env.VITE_LASTNAME,
    VITE_TEMP_TOKEN: import.meta.env.VITE_TEMP_TOKEN,
  });
};

export const environments = ensureEnvironments();
