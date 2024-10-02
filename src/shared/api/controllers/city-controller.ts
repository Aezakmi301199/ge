import { makeAutoObservable } from 'mobx';
import { cityControllerGetBuildings, cityControllerGetDistricts } from '../generated-api/api';
import {
  BuildingResponse,
  CityControllerGetBuildingsParams,
  CityControllerGetDistrictsParams,
  District,
} from '../generated-api/api.schemas';

export class CityController {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  static getBuildings = async (id: string, params?: CityControllerGetBuildingsParams): Promise<BuildingResponse[]> => {
    const data = await cityControllerGetBuildings(id, params);

    return data;
  };

  static getDistricts = async (cityId: string, params?: CityControllerGetDistrictsParams): Promise<District[]> => {
    const data = await cityControllerGetDistricts(cityId, params);

    return data;
  };
}
