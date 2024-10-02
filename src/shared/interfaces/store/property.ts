export interface IProperty<PropertyResponse> {
  properties: PropertyResponse[];
  property: PropertyResponse | null;
  isLoading: boolean;

  fetchData: (cityId: string) => Promise<void>;
  fetchPropertyById: (id: string) => Promise<void>;
  resetProperty: () => void;
  createShowing: (id: string, dealId: number) => Promise<void>;
}
