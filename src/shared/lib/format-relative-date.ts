import { DateTime } from 'luxon';
import { formatIsoDate } from './format-date';
import i18n from '../../i18n/config';
import { capitalize } from '@mui/material';

export const formatRelativeDate = (isoDateString: string): string => {
  const date = DateTime.fromISO(isoDateString).setLocale(i18n.language);
  const now = DateTime.now().setLocale(i18n.language);
  const yesterday = DateTime.now().minus({ days: 1 }).setLocale(i18n.language);

  if (date.day === now.day) {
    return capitalize(`${now.toRelativeCalendar()} ${date.toFormat('HH:mm')}`);
  }

  if (date.day === yesterday.day) {
    return capitalize(`${yesterday.toRelativeCalendar({ unit: 'days' })} ${date.toFormat('HH:mm')}`);
  }

  return formatIsoDate(isoDateString);
};
