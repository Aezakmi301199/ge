import React, { useEffect, useState } from 'react';
import { theme } from '../../../theme';
import TimeAndNameOfHistory from './time-and-name-of-history';
import { HistoryTypography } from './ui';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { Stack } from '@mui/material';
import { cityControllerGetDistricts } from '../../../shared/api/generated-api/api';
import { DistrictResponse, PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ActionKey from './action-key';
import { useUser } from '../../../provider/user.provider';

interface DistrictProps {
  history: PropertyActionHistoryResponse;
}

const DistrictComponent: React.FC<DistrictProps> = ({ history }) => {
  const user = useUser();
  const [districts, setDistricts] = useState<DistrictResponse[]>([]);

  useEffect(() => {
    if (!user.user) {
      return;
    }

    cityControllerGetDistricts(user.user.portal.citiesPortals[0].city.id).then((res) => {
      setDistricts(res);
    });
  }, []);

  const findDistrictNameById = (id: string) => {
    return districts.find((district) => district.id === id) || null;
  };

  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        <BodyTypography_1>{findDistrictNameById(history.data.oldValue?.toString())?.name}</BodyTypography_1>
        <BodyTypography_1>→</BodyTypography_1>
        <BodyTypography_1>{findDistrictNameById(history.data.newValue?.toString())?.name}</BodyTypography_1>
      </HistoryTypography>
    </Stack>
  );
};

export default DistrictComponent;
