import React, { FC } from 'react';
import Location from '../../new-property-draft/ui/location';
import { useFormContext } from 'react-hook-form';
import { SxProps } from '@mui/system';
import { observer } from 'mobx-react-lite';

interface ControlledLocationProps {
  sx?: SxProps;
}

const ControlledLocation: FC<ControlledLocationProps> = ({ sx }) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const typeFieldsValueCityId = watch('cityId');
  const typeFieldsValueBuildingId = watch('buildingId');
  const typeFieldsValueDistrictId = watch('districtId');
  const buildingError = Boolean(errors.latitude);
  return (
    <Location
      sx={sx}
      valueCity={typeFieldsValueCityId}
      onChangeCity={(cityId) => setValue('cityId', cityId, { shouldDirty: true, shouldTouch: true })}
      valueDistrict={typeFieldsValueDistrictId}
      onChangeDistrict={(districtId) => setValue('districtId', districtId, { shouldDirty: true, shouldTouch: true })}
      valueBuilding={typeFieldsValueBuildingId}
      hasBuildingError={buildingError}
      onChangeBuilding={(buildingId, lngLatCoordinates) => {
        setValue('buildingId', buildingId, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        setValue('longitude', lngLatCoordinates[0], { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        setValue('latitude', lngLatCoordinates[1], { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      }}
    />
  );
};

export default observer(ControlledLocation);
