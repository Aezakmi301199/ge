import { DateTime } from 'luxon';

export const calculateDaysLeft = (expiresAt: string) => {
  const expiresDate = DateTime.fromISO(expiresAt);
  const now = DateTime.now();
  const daysLeft = expiresDate.diff(now, 'days').days;

  return Math.round(daysLeft);
};
