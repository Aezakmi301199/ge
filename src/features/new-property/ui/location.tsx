import React from 'react';
import { t } from 'i18next';
import { Room } from '@mui/icons-material';
import { Stack } from '@mui/material';
import ButtonWithIcon from '../../../shared/button/button-with-icon';
import TextInput from '../../../shared/input/text-input';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import { ContainerBlock } from '../../../shared/ui-kit/styled';
import { theme } from '../../../theme';

const Location = () => {
  return (
    <ContainerBlock>
      <HeadlineTypography_6>{t('Location')}</HeadlineTypography_6>
      <Stack sx={{ gap: '8px' }}>
        <TextInput value={'Dubai'} label={'City'} />
        <TextInput value={'Al Barsha'} label={'District'} />
        <TextInput value={'Golden Sands Tower'} label={'Building'} />
        <ButtonWithIcon
          icon={<Room />}
          text={'Mark on the map'}
          hasStartIcon={true}
          sx={{
            width: '200px',
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

export default Location;
