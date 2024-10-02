import { theme } from '../../theme';

export const propertyStatus: Record<string, string> = {
  SUSPENDED: 'Suspended',
  ACTIVE: 'Active',
  PREPARED: 'Prepared',
  DEPOSIT: 'Deposit',
  DELETED: 'Deleted',
  SOLD: 'Sold',
  PRE_LISTING: 'Pre-listing',
  TO_FIX: 'To fix',
};

export const propertyStatusColor: Record<string, string> = {
  SUSPENDED: theme.text.white,
  ACTIVE: theme.base.primary.main,
  PREPARED: theme.base.primary.hover,
  DEPOSIT: theme.base.warning.main,
  DELETED: theme.text.white,
  SOLD: theme.base.neutral.main,
  PRE_LISTING: theme.base.warning.main,
  TO_FIX: theme.base.error.main,
};
