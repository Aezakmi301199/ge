import { DateTime } from 'luxon';

export const formatIsoDate = (isoDateString: string): string => {
  return DateTime.fromISO(isoDateString).toFormat('dd.MM.yyyy HH:mm');
};
