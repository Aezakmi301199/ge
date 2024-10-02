import { PropertyHistoryCurrency } from '../interfaces/property-history';

export function isPropertyHistoryCurrency(
  history: unknown,
): history is { data: { newValue: PropertyHistoryCurrency; oldValue: PropertyHistoryCurrency | null } } {
  // Проверяем, что history — это объект и он не равен null
  if (
    typeof history !== 'object' ||
    history === null ||
    !('data' in history) ||
    typeof history.data !== 'object' ||
    history.data === null
  ) {
    return false;
  }

  const data = history.data;

  // Проверяем структуру data
  if (
    typeof data !== 'object' ||
    !('key' in data && typeof data.key === 'string') ||
    !('newValue' in data && typeof data.newValue === 'object' && data.newValue !== null) ||
    !('oldValue' in data && (typeof data.oldValue === 'object' || data.oldValue === null))
  ) {
    return false;
  }

  const newValue = data.newValue;
  const oldValue = data.oldValue;

  // Проверяем наличие 'isoLetters' в newValue, при этом oldValue может быть null
  return 'isoLetters' in newValue && (oldValue === null || 'isoLetters' in oldValue);
}
