export const convertSqmToSqft = (sqft: unknown) => {
  const conversionFactor = 0.092903;

  return parseFloat((Number(sqft) / conversionFactor).toFixed(0));
};
