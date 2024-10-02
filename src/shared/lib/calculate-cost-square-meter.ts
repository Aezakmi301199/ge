interface ICalculateCostSquareMeter {
  price: number | null;
  area: unknown;
}

export const calculateCostSquareMeter = ({ price, area }: ICalculateCostSquareMeter) => {
  const incorrectPriceOrArea = !Number(price) || !Number(area) || !price || !area;

  if (incorrectPriceOrArea) {
    return 'No data';
  }

  return Math.round(Number(price) / Number(area));
};
