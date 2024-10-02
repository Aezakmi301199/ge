import { SelectChangeEvent } from '@mui/material';
import { action, makeAutoObservable, observable } from 'mobx';

export interface ISelectStore {
  value: string | undefined;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

export interface ToggleStoreOptionProps {
  convertEmptyStringToUndefined?: boolean;
  trimValue?: boolean;
  disableSpaces?: boolean;
}

class SelectStore implements ISelectStore {
  @observable value: string | undefined = undefined;
  @observable options: ToggleStoreOptionProps = {
    convertEmptyStringToUndefined: false,
    trimValue: false,
    disableSpaces: false,
  };

  constructor(value?: string, options?: ToggleStoreOptionProps) {
    if (options) {
      this.options = options;
    }

    if (value) {
      this.value = value;
    }

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  onChange(event: SelectChangeEvent<string>, child: React.ReactNode) {
    this.value = event.target.value;
    console.log(this.value);
  }
}

export default SelectStore;
