import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';
import { t } from 'i18next';
import { ContainerBlock, FormControlLabelContainer } from '../../../shared/ui-kit/styled';
import InputMultiselect from '../../../shared/input/input-multiselect';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import { theme } from '../../../theme';
import { Amenity } from '../../../shared/interfaces/property';
import ToggleAmenitiesButton from '../../../shared/toggle-button/toggle-amenities-button';
import { observer } from 'mobx-react-lite';
import { match } from 'ts-pattern';
import { ZodIssueCode } from 'zod';
import { PropertyDraftSettings } from '../hooks/use-base-draft-property-form';
import { AmenityController } from '../../../shared/api/controllers/amenity-controller';
import TextFieldStore from '../../../shared/store/text-field.store';

const ControlledDescription = () => {
  const { control } = useFormContext();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const maxRowsForDescriptionInput = 34;
  const [textFieldEnStore] = useState(
    () => new TextFieldStore(undefined, { convertEmptyStringToNull: true, disableSpaces: false }),
  );

  const [textFieldRuStore] = useState(
    () => new TextFieldStore(undefined, { convertEmptyStringToUndefined: true, disableSpaces: false }),
  );
  const fetch = () => {
    AmenityController.getAll().then((data) => setAmenities(data));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ContainerBlock>
      <Stack gap={'8px'}>
        <HeadlineTypography_6 pb={'7px'}>{t('Amenities and Description')}</HeadlineTypography_6>
        <Controller
          name={'amenities'}
          control={control}
          render={({ field: { value, onChange } }) => {
            return <ToggleAmenitiesButton value={value} onToggle={onChange} amenities={amenities} willSelect={true} />;
          }}
        />
      </Stack>
      <Stack gap={theme.base.module['2_5']}>
        <Stack sx={{ paddingTop: theme.base.module['1'], gap: theme.base.module['0_5'] }}>
          <FormControlLabelContainer>{t('Description')}</FormControlLabelContainer>
        </Stack>
        <Stack gap={theme.base.module[2]}>
          <Controller
            name='descriptionEN'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <InputMultiselect
                  label='Description, EN'
                  error={!!error}
                  helperText={match(error)
                    .with(undefined, () =>
                      value
                        ? `${value.length}/ ${PropertyDraftSettings.MAX_DESCRIPTION_LENGTH}`
                        : `Minimum of ${PropertyDraftSettings.MIN_DESCRIPTION_LENGTH} letters`,
                    )
                    .with({ type: ZodIssueCode.invalid_type }, () => error?.message)
                    .with(
                      { type: ZodIssueCode.too_big },
                      () => value && `${value.length} /${PropertyDraftSettings.MAX_DESCRIPTION_LENGTH}`,
                    )
                    .with(
                      { type: ZodIssueCode.too_small },
                      () => `Minimum of ${PropertyDraftSettings.MIN_DESCRIPTION_LENGTH} letters`,
                    )
                    .otherwise(() => error && error.message)}
                  value={textFieldEnStore.valueFormToValueStore(value)}
                  onChange={(event) => {
                    textFieldEnStore.onChange(event);
                    onChange(textFieldEnStore.valueForForm);
                  }}
                  required={true}
                  maxRows={maxRowsForDescriptionInput}
                  sx={{
                    width: '100%',
                    '&>.MuiOutlinedInput-root ': {
                      padding: '8px 14px',
                      minHeight: '64px',
                      flexDirection: 'column',
                      justifyContent: 'start',
                    },
                    '&>label': {
                      top: '-8px',
                    },
                    '&>label.MuiInputLabel-shrink': {
                      top: '0px',
                    },
                  }}
                />
              );
            }}
          />
          <Controller
            name='descriptionRU'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <InputMultiselect
                  label='Description, RU'
                  error={!!error}
                  helperText={match(error)
                    .with(undefined, () =>
                      value
                        ? `${value.length}/ ${PropertyDraftSettings.MAX_DESCRIPTION_LENGTH}`
                        : `Minimum of ${PropertyDraftSettings.MIN_DESCRIPTION_LENGTH} letters`,
                    )
                    .with({ type: ZodIssueCode.invalid_type }, () => error?.message)
                    .with(
                      { type: ZodIssueCode.too_big },
                      () => value && `${value.length} /${PropertyDraftSettings.MAX_DESCRIPTION_LENGTH}`,
                    )
                    .with(
                      { type: ZodIssueCode.too_small },
                      () => `Minimum of ${PropertyDraftSettings.MIN_DESCRIPTION_LENGTH} letters`,
                    )
                    .otherwise(() => error && error.message)}
                  value={textFieldRuStore.valueFormToValueStore(value)}
                  onChange={(event) => {
                    textFieldRuStore.onChange(event);
                    onChange(textFieldRuStore.valueForForm);
                  }}
                  maxRows={maxRowsForDescriptionInput}
                  required={true}
                  sx={{
                    width: '100%',
                    '&>.MuiOutlinedInput-root ': {
                      padding: '8px 14px',
                      minHeight: '64px',
                      flexDirection: 'column',
                      justifyContent: 'start',
                    },
                    '&>label': {
                      top: '-8px',
                    },
                    '&>label.MuiInputLabel-shrink': {
                      top: '0px',
                    },
                  }}
                />
              );
            }}
          />
        </Stack>
      </Stack>
    </ContainerBlock>
  );
};

export default observer(ControlledDescription);
