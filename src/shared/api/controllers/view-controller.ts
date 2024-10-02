import { makeAutoObservable } from 'mobx';
import { View } from '../../interfaces/view';
import { viewControllerFindByCityId } from '../generated-api/api';

export class ViewController {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  static findByCityId = async (cityId: string[]): Promise<View[]> => {
    const data = await viewControllerFindByCityId({
      cityId,
    });

    return data;
  };
}
