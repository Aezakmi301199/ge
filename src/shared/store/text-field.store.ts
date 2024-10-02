import { action, makeAutoObservable, observable } from 'mobx';
import { match, P } from 'ts-pattern';

export interface ITextFieldStore {
  value: string | undefined;
}

export interface ToggleStoreOptionProps {
  convertEmptyStringToUndefined?: boolean;
  convertEmptyStringToNull?: boolean;
  trimValue?: boolean;
  disableSpaces?: boolean;
}

class TextFieldStore implements ITextFieldStore {
  @observable value: string = '';
  @observable options: ToggleStoreOptionProps = {
    convertEmptyStringToUndefined: false,
    convertEmptyStringToNull: false,
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
  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (this.options.disableSpaces) {
      this.value = this.clearSpaces(value);

      return;
    }

    this.value = value;
  }

  @action
  clearSpaces = (value: TextFieldStore['value']) => {
    return value ? value.trim() : value;
  };

  @action
  setValue = (value: TextFieldStore['value']) => {
    this.value = value;
  };

  get valueForForm() {
    return match({ options: this.options, value: this.value })
      .when(
        ({ value }) => value.length >= 1,
        ({ value }) => value,
      )
      .with({ options: { convertEmptyStringToNull: true } }, () => null)
      .with({ options: { convertEmptyStringToUndefined: true } }, () => undefined)
      .otherwise(() => '');
  }

  @action
  valueFormToValueStore(value: unknown) {
    return match({ options: this.options, value })
      .with({ value: P.string }, () => value)
      .otherwise(() => '') as string;
  }
}

export default TextFieldStore;
