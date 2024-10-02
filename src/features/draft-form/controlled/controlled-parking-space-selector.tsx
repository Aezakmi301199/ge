import React, { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';
import { theme } from '../../../theme';
import { t } from 'i18next';
import { FormControlLabelContainer } from '../../../shared/ui-kit/styled';
import ToggleButtons from '../../../shared/toggle-button/toggle-buttons';
import { observer } from 'mobx-react-lite';
import ToggleStore from '../../../shared/store/toggle-store';

type ControlledParkingSpaceSelectorProps = {
  options?: string[];
};

const ControlledParkingSpaceSelector: FC<ControlledParkingSpaceSelectorProps> = ({ options = [0, 1, 2, 3, 4, 5] }) => {
  const { control } = useFormContext();
  const [toggleStore] = useState(() => new ToggleStore());

  return (
    <Controller
      name={'typeFields.parkingSpacesCount'}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Stack sx={{ gap: theme.base.module['2_5'] }}>
            <Stack sx={{ paddingTop: theme.base.module['1'], gap: theme.base.module['0_5'] }}>
              <FormControlLabelContainer>{t('No of parking spaces')}</FormControlLabelContainer>
            </Stack>
            <ToggleButtons
              value={value}
              onChange={(value) => {
                toggleStore.onChange(value);
                onChange(toggleStore.value);
              }}
              showLabel={false}
              text={''}
              values={options}
              showStudioOption={false}
            />
          </Stack>
        );
      }}
    />
  );
};

export default observer(ControlledParkingSpaceSelector);
