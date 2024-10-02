import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { IHistory } from '../../shared/interfaces/store/history';
import { propertyControllerGetHistory, propertyControllerGetHistoryCount } from '../../shared/api/generated-api/api';
import type { CountResponse, PropertyActionHistoryResponse } from '../../shared/api/generated-api/api.schemas';

export class HistoryStore implements IHistory<PropertyActionHistoryResponse> {
  @observable history: PropertyActionHistoryResponse[] = [];
  @observable isLoading: boolean = false;
  @observable count: CountResponse = { count: 0 };
  @observable hasError: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async fetchPropertyHistory(id: string | undefined, page: number) {
    if (!id) {
      return;
    }

    this.isLoading = true;

    try {
      const response = await propertyControllerGetHistory(id, { page });

      runInAction(() => {
        this.history = [...this.history, ...response];
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  }

  @action
  async fetchPropertyHistoryCount(id: string | undefined) {
    if (!id) {
      return;
    }

    this.isLoading = true;

    try {
      const response = await propertyControllerGetHistoryCount(id);

      runInAction(() => {
        this.count = response;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.hasError = true;
        this.isLoading = false;
      });
    }
  }

  @action
  resetHistory() {
    this.history = [];
  }
}
