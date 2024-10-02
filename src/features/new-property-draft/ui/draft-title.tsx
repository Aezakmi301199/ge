import React, { FC } from 'react';
import { ContainerBlock } from '../../../shared/ui-kit/styled';
import { t } from 'i18next';
import { Stack } from '@mui/material';
import TextInput from '../../../shared/input/text-input';
import { SxProps } from '@mui/system';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';

type DraftTitleProps = {
  sx?: SxProps;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
};

const DraftTitle: FC<DraftTitleProps> = ({ sx, onChange, value }) => {
  return (
    <ContainerBlock>
      <HeadlineTypography_6 sx={{ pb: '7px' }}>{t('Title')}</HeadlineTypography_6>
      <Stack sx={{ gap: '8px', ...sx }}>
        <TextInput onChange={onChange} value={value} label={''} />
      </Stack>
    </ContainerBlock>
  );
};

export default DraftTitle;
