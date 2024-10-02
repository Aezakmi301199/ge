import { makeAutoObservable } from 'mobx';
import { Amenity } from '../../interfaces/property';
import { amenityControllerGetAll } from '../generated-api/api';

export class AmenityController {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  static getAll = async (): Promise<Amenity[]> => {
    const data = await amenityControllerGetAll();

    return data;
  };
}
