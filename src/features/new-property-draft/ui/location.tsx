import { FC, useEffect, useState } from 'react';
import ButtonWithIcon from '../../../shared/button/button-with-icon';
import { t } from 'i18next';
import { theme } from '../../../theme';
import { Stack } from '@mui/material';
import { ContainerBlock } from '../../../shared/ui-kit/styled';
import { SxProps } from '@mui/system';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import PinDropIcon from '../../../assets/icons/maps/pin-drop/pin-drop.icon';
import CityAutoComplete from '../../../shared/autocomplete/city-auto-complete';
import DistrictAutoComplete from '../../../shared/autocomplete/district-auto-complete';
import BuildingAutoComplete from '../../../shared/autocomplete/building-auto-complete';
import { observer } from 'mobx-react-lite';
import { useUser } from '../../../provider/user.provider';
import { CityController } from '../../../shared/api/controllers/city-controller';
import { BuildingResponse, DistrictResponse } from '../../../shared/api/generated-api/api.schemas';
import { match, P } from 'ts-pattern';

type LocationProps = {
  sx?: SxProps;
  valueCity: string;
  onChangeCity: (cityId: string) => void;
  valueDistrict: string;
  onChangeDistrict: (buildingId: string) => void;
  valueBuilding: string;
  onChangeBuilding: (buildingId: string, lngLatCoordinates: string[]) => void;
  hasBuildingError?: boolean;
};

const Location: FC<LocationProps> = ({
  sx,
  valueCity,
  onChangeCity,
  valueDistrict,
  onChangeDistrict,
  valueBuilding,
  onChangeBuilding,
  hasBuildingError,
}) => {
  const user = useUser();
  const userCities = user.user?.portal.citiesPortals;
  const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
  const [districts, setDistricts] = useState<DistrictResponse[]>([]);
  const showDistrict = false;
  const selectedCity = match({ valueCity, userCities })
    .with({ valueCity: P.string }, () => valueCity)
    .otherwise(({ userCities }) => userCities[0] ?? '');

  useEffect(() => {
    if (selectedCity) {
      CityController.getDistricts(selectedCity).then((data) => setDistricts(data));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      const params = match({ selectedCity, valueDistrict })
        .with({ valueDistrict: P.string }, ({ valueDistrict }) => ({
          districtId: valueDistrict,
        }))
        .otherwise(() => undefined);
      CityController.getBuildings(selectedCity, params).then((data) => {
        setBuildings(data);
      });
    }
  }, [selectedCity, valueDistrict]);

  if (!userCities) {
    return null;
  }

  return (
    <ContainerBlock>
      <HeadlineTypography_6>{t('Location')}</HeadlineTypography_6>
      <Stack sx={{ gap: theme.base.module['1_5'], ...sx }}>
        <CityAutoComplete value={selectedCity} onChange={onChangeCity} required={true} options={userCities} />
        {showDistrict && (
          <DistrictAutoComplete value={valueDistrict} onChange={onChangeDistrict} required={true} options={districts} />
        )}
        <BuildingAutoComplete
          error={hasBuildingError}
          value={valueBuilding}
          onChange={onChangeBuilding}
          required={true}
          options={buildings}
        />
        <ButtonWithIcon
          icon={<PinDropIcon />}
          text={'Mark on the map'}
          hasStartIcon={true}
          sx={{
            width: 'fit-content',
            backgroundColor: theme.bg.button.dark.default,
            color: theme.base.primary.contrast,
            padding: '8px 22px',
            borderRadius: theme.common.input.shape.border_radius,
            '&:hover': { backgroundColor: theme.bg.button.dark.default },
          }}
        />
      </Stack>
    </ContainerBlock>
  );
};

export default observer(Location);
