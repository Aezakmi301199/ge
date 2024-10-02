import { action, makeAutoObservable, observable } from 'mobx';
import React from 'react';

export interface ISwitchStore {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface SwitchStoreOptionProps {}

class SwitchStore implements ISwitchStore {
  @observable checked: boolean = false;

  constructor(checked?: boolean, options?: SwitchStoreOptionProps) {
    if (checked) {
      this.checked = checked;
    }

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  onChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    this.checked = checked;
  }
}

export default SwitchStore;
