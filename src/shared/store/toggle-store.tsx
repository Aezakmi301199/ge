import { action, makeAutoObservable, observable } from 'mobx';

export interface IToggleStore {
  value: string | undefined;
  required: boolean;
}

export interface ToggleStoreOptionProps {
  required?: boolean;
}

class ToggleStore implements IToggleStore {
  @observable value: string | undefined = undefined;
  @observable required: boolean = false;

  constructor(value?: string, options?: ToggleStoreOptionProps) {
    if (options) {
      options.required ? (this.required = options.required) : null;
    }

    if (value) {
      this.value = value;
    }

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  onChange(value: ToggleStore['value']) {
    if (this.required && !value) {
      return;
    }

    this.value = value;
  }
}

export default ToggleStore;
