import { action, makeAutoObservable, observable } from 'mobx';

export interface ITransactionChipStore {
  value: string | undefined;
  required: boolean;
}

export interface TransactionChipStoreProps {
  required?: boolean;
}

class TransactionChipStore implements ITransactionChipStore {
  @observable value: string | undefined = undefined;
  @observable required: boolean = false;

  constructor(value?: string, options?: TransactionChipStoreProps) {
    if (options) {
      options.required ? (this.required = options.required) : null;
    }

    if (value) {
      this.value = value;
    }

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  toggleValue(value: TransactionChipStore['value']) {
    if (!this.required && this.value === value) {
      this.value = undefined;

      return;
    }

    this.value = value;
  }
}

export default TransactionChipStore;
