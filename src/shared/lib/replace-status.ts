import { propertyStatus } from '../../entities/status/property-status';

export const replaceStatus = (status: string) => {
  if (!propertyStatus[status]) {
    return 'Not specified';
  }

  return propertyStatus[status];
};
