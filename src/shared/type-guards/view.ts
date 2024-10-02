import { PropertyHistoryView } from '../interfaces/property-history';

export function isPropertyHistoryView(history: unknown): history is PropertyHistoryView {
  if (typeof history !== 'object' || history === null || !('data' in history)) {
    return false;
  }

  const data = history.data as unknown;

  if (
    typeof data !== 'object' ||
    data === null ||
    !('newValue' in data && Array.isArray(data.newValue)) ||
    !('oldValue' in data && Array.isArray(data.oldValue))
  ) {
    return false;
  }

  const newValue = data.newValue;
  const oldValue = data.oldValue;

  return (
    newValue.every((viewObj) => 'view' in viewObj && 'id' in viewObj.view && 'name' in viewObj.view) &&
    oldValue.every((viewObj) => 'view' in viewObj && 'id' in viewObj.view && 'name' in viewObj.view)
  );
}
