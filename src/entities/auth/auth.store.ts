import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { IAuth } from '../../shared/interfaces/store/auth';
import apiClient from '../../shared/api/instance/api-client';
import { userControllerFindCurrent } from '../../shared/api/generated-api/api';
import { UserResponse } from '../../shared/api/generated-api/api.schemas';

export class AuthStore implements IAuth {
  @observable user: UserResponse | null = null;
  private token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setToken(newToken: string) {
    this.token = newToken;
    apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
  }

  @action
  getToken() {
    return this.token;
  }

  @action
  async fetchUserInfo() {
    try {
      const user = await userControllerFindCurrent();

      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
