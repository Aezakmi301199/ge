import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { PropertyStore } from '../../../entities/property/property.store';
import { useUser } from '../../../provider/user.provider';
import { BodyTypography_1, HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { PropertyResponse } from '../../../shared/api/generated-api/api.schemas';
import { Box, CircularProgress, Stack } from '@mui/material';
import { theme } from '../../../theme';

interface RenderPropertyPropsGetProviderProps {
  children: (data: PropertyResponse) => React.ReactElement;
  store: PropertyStore;
}

const RenderPropertyPropsGetProvider: React.FC<RenderPropertyPropsGetProviderProps> = observer(
  ({ children, store }) => {
    const { user } = useUser();

    useEffect(() => {
      store.fetchData(user?.portal.citiesPortals[0].city.id);
    }, [store.getOrder()]);

    return (
      <>
        {store.hasError ? (
          <Stack gap={'10px'} paddingTop={theme.layout.padding_xl}>
            <HeadlineTypography_6>{t('Failed to get objects')}</HeadlineTypography_6>
            <BodyTypography_1>{t('Please refresh the page')}</BodyTypography_1>
          </Stack>
        ) : (
          <>
            {store.isLoading ? (
              <Box
                sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>{store.properties.map((item) => children(item))}</>
            )}
          </>
        )}
      </>
    );
  },
);

export default RenderPropertyPropsGetProvider;
