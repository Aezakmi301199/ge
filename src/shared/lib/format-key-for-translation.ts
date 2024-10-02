// Функция для форматирования ключей
export const formatKeyForTranslation = (key: string): string => {
  return key.replace(/_/g, ' '); // Преобразуем "HALF_FLOOR" в "HALF FLOOR"
};
