import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { View } from '../../shared/interfaces/view';
import { ViewController } from '../../shared/api/controllers/view-controller';

export interface IView {
  views: View[];
  fetchViews: (cityId: string[]) => Promise<void>;
}

export class ViewStore implements IView {
  @observable views: View[] = [];

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  async fetchViews(cityId: string[]) {
    try {
      const data = await ViewController.findByCityId(cityId);

      runInAction(() => {
        this.views = data;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
