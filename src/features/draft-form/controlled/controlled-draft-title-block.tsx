import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SxProps } from '@mui/system';
import TextInput from '../../../shared/input/text-input';
import { match } from 'ts-pattern';
import TextFieldStore from '../../../shared/store/text-field.store';
import { ContainerBlock } from '../../../shared/ui-kit/styled';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';

type ControlledDraftTitleProps = {
  sx?: SxProps;
  minValue?: number;
  maxValue?: number;
};

const ControlledDraftTitleBlock: FC<ControlledDraftTitleProps> = ({ sx, maxValue = 100 }) => {
  const { control } = useFormContext();
  const [textFieldStore] = useState(
    () => new TextFieldStore('', { convertEmptyStringToUndefined: true, trimValue: true }),
  );

  const { clearSpaces, valueFormToValueStore } = textFieldStore;

  return (
    <ContainerBlock>
      <HeadlineTypography_6 sx={{ pb: '7px' }}>{t('Title')}</HeadlineTypography_6>
      <Stack sx={{ gap: '8px', ...sx }}>
        <Controller
          name={'typeFields.title'}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextInput
                label='Title'
                onChange={(e) => {
                  textFieldStore.onChange(e);
                  onChange(textFieldStore.valueForForm);
                }}
                onBlur={() => {
                  textFieldStore.setValue(clearSpaces(value));
                  onChange(textFieldStore.valueForForm);
                }}
                value={valueFormToValueStore(value)}
                showErrorText={true}
                required={false}
                error={Boolean(error)}
                helperText={match(error)
                  .with({ type: 'required' }, () => `This field is required`)
                  .with({ type: 'maxLength' }, () => `Maximum of ${maxValue} letters`)
                  .otherwise(() => error && error.message)}
              />
            );
          }}
        />
      </Stack>
    </ContainerBlock>
  );
};

export default observer(ControlledDraftTitleBlock);
