import { SelectChangeEvent } from '@mui/material';
import { action, makeAutoObservable, observable } from 'mobx';
import { match } from 'ts-pattern';

interface IcoefficientToSqm {
  sqft: number;
}

export interface IConfigAreaStore {
  area: number | undefined;
  unit: string;
  onChangeArea: (value: number) => void;
  onChangeUnit: (event: SelectChangeEvent<string | undefined>, child: React.ReactNode) => void;
  coefficientToSqm: IcoefficientToSqm;
}

export interface ConfigAreaStoreProps {
  area: number | undefined;
  unit: string;
  maxValue: number;
}

interface ICoefficientToSqm {
  sqft: number;
}

enum CoefficientToSqm {
  sqft = 10.76,
}

class ConfigAreaStore implements IConfigAreaStore {
  @observable area: number | undefined = undefined;
  @observable unit: string = 'sqm';
  @observable coefficientToSqm: ICoefficientToSqm = {
    sqft: CoefficientToSqm.sqft,
  };
  @observable maxValue: number = 1000;

  constructor({ area, unit, maxValue }: ConfigAreaStoreProps) {
    if (area) {
      this.area = area;
    }

    if (unit) {
      this.unit = unit;
    }

    if (maxValue) {
      this.maxValue = maxValue;
    }

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  onChangeArea(area: ConfigAreaStore['area']) {
    if (area && area >= this.maxValue) {
      return;
    }

    this.area = area;
  }

  @action
  setArea(area: ConfigAreaStore['area']) {
    this.area = area;
  }

  @action
  onChangeUnit(event: SelectChangeEvent<string | undefined>, child: React.ReactNode) {
    if (!event.target.value) {
      return;
    }

    this.unit = event.target.value;
  }

  @action
  getAreaByCoefficient(area: number | undefined, unit: ConfigAreaStore['unit']): number | undefined {
    if (!area) {
      return undefined;
    }

    const value = match({ unit: unit })
      .with({ unit: 'sqm' }, () => area)
      .with({ unit: 'sqft' }, () => area / this.coefficientToSqm.sqft)
      .otherwise(() => 1);

    return Math.ceil(value);
  }
}

export default ConfigAreaStore;
