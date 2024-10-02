import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextFieldStore from '../../../shared/store/text-field.store';
import TextInput from '../../../shared/input/text-input';
import { match } from 'ts-pattern';
import { observer } from 'mobx-react-lite';

interface ControlledTitleDeedProps {
  maxValue?: number;
  minValue?: number;
}

const ControlledTitleDeed: FC<ControlledTitleDeedProps> = ({ maxValue = 100 }) => {
  const { control } = useFormContext();
  const [textFieldStore] = useState(
    () => new TextFieldStore(undefined, { convertEmptyStringToUndefined: true, disableSpaces: true }),
  );

  const { valueFormToValueStore } = textFieldStore;

  return (
    <Controller
      name='typeFields.titleDeed'
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <TextInput
            label='Title deed'
            value={valueFormToValueStore(value)}
            onChange={(e) => {
              textFieldStore.onChange(e);
              onChange(textFieldStore.valueForForm);
            }}
            showErrorText={true}
            required={false}
            error={Boolean(error)}
            helperText={match(error)
              .with({ type: 'maxLength' }, () => `Maximum of ${maxValue} letters`)
              .otherwise(() => error && error.message)}
          />
        );
      }}
    />
  );
};

export default observer(ControlledTitleDeed);
