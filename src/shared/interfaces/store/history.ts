import type { CountResponse } from '../../api/generated-api/api.schemas';

export interface IHistory<PropertyActionHistoryResponse> {
  history: PropertyActionHistoryResponse[];
  isLoading: boolean;
  count: CountResponse;
  hasError: boolean;

  fetchPropertyHistory: (id: string | undefined, page: number) => Promise<void>;
  fetchPropertyHistoryCount: (id: string | undefined) => Promise<void>;
  resetHistory: () => void;
}
