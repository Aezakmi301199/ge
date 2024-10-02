import { makeAutoObservable } from 'mobx';
import { userControllerFindDeals } from '../generated-api/api';
import { DealResponse, UserControllerFindDealsDealCategoryType } from '../generated-api/api.schemas';

export class UserController {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  static findDeals = async (id: string): Promise<DealResponse[]> => {
    return await userControllerFindDeals(id, { dealCategoryType: UserControllerFindDealsDealCategoryType.SALE });
  };
}
