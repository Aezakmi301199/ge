// Строковое число в число
export const stringToNumber = (value: string): number => {
  return parseFloat(value.replace(/\s+/g, ''));
};
