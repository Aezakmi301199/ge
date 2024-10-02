import { propertyStatus, propertyStatusColor } from '../../entities/status/property-status';

export const getStatusColor = (status: string) => {
  if (!propertyStatus[status]) {
    return 'Not specified';
  }

  return propertyStatusColor[status];
};
