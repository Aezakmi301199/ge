import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextInput from '../../../shared/input/text-input';
import TextFieldStore from '../../../shared/store/text-field.store';
import { match } from 'ts-pattern';
import { observer } from 'mobx-react-lite';
interface ControlledUnitNumberProps {
  maxValue?: number;
  minValue?: number;
}

const ControlledUnitNumber: FC<ControlledUnitNumberProps> = ({ maxValue = 30 }) => {
  const { control } = useFormContext();
  const [textFieldStore] = useState(
    () => new TextFieldStore(undefined, { convertEmptyStringToUndefined: true, trimValue: true }),
  );
  const { clearSpaces, valueFormToValueStore } = textFieldStore;

  return (
    <Controller
      name='typeFields.unitNumber'
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <TextInput
            label='Unit number'
            value={valueFormToValueStore(value)}
            onChange={(e) => {
              textFieldStore.onChange(e);
              onChange(textFieldStore.valueForForm);
            }}
            onBlur={() => {
              textFieldStore.setValue(clearSpaces(value));
              onChange(textFieldStore.valueForForm);
            }}
            showErrorText={true}
            required={true}
            error={Boolean(error)}
            helperText={match(error)
              .with({ type: 'required' }, () => `This field is required`)
              .with({ type: 'maxLength' }, () => `Maximum of ${maxValue} letters`)
              .otherwise(() => error && error.message)}
          />
        );
      }}
    />
  );
};
export default observer(ControlledUnitNumber);
