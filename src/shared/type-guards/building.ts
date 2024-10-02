import { PropertyHistoryBuilding } from '../interfaces/property-history';

export function isPropertyHistoryBuilding(history: unknown): history is PropertyHistoryBuilding {
  if (typeof history !== 'object' || history === null) {
    return false;
  }

  if (!('data' in history)) {
    return false;
  }

  const data = history.data;

  if (typeof data !== 'object' || data === null) {
    return false;
  }

  return (
    'key' in data &&
    typeof data.key === 'string' &&
    'newValue' in data &&
    typeof data.newValue === 'object' &&
    'oldValue' in data &&
    typeof data.oldValue === 'object'
  );
}
