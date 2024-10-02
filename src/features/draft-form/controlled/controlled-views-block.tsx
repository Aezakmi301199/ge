import { FC, useEffect } from 'react';
import { Stack } from '@mui/material';
import { t } from 'i18next';
import { Controller, useFormContext } from 'react-hook-form';
import ToggleViewButton from '../../../shared/toggle-button/toggle-view-button';
import { useRootStore } from '../../../provider/use-root-store';
import { theme } from '../../../theme';
import { FormControlLabelContainer } from '../../../shared/ui-kit/styled';
import { SxProps } from '@mui/system';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useUser } from '../../../provider/user.provider';

interface ControlledViewsBlockProps {
  stackProps?: {
    sx?: SxProps;
  };
}

const ControlledViewsBlock: FC<ControlledViewsBlockProps> = () => {
  const { control } = useFormContext();
  const { viewStore } = useRootStore();
  const { views } = viewStore;
  const user = useUser();
  const userCityId = user.user?.portal.citiesPortals[0].city.id;
  const localState = useLocalStore(() => ({ loadingViews: true }));

  const fetch = async () => {
    if (userCityId) {
      localState.loadingViews = true;
      await viewStore.fetchViews([userCityId]).finally(() => {
        localState.loadingViews = false;
      });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (localState.loadingViews) {
    return null;
  }

  return (
    <Controller
      name={'views'}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Stack gap={theme.base.module['2_5']}>
            <Stack sx={{ paddingTop: theme.base.module['1'], gap: theme.base.module['0_5'] }}>
              <FormControlLabelContainer>{t('A view of')}</FormControlLabelContainer>
            </Stack>
            <ToggleViewButton onToggle={onChange} value={value} views={views} willSelect={true}></ToggleViewButton>
          </Stack>
        );
      }}
    />
  );
};

export default observer(ControlledViewsBlock);
