import React from 'react';
import { t } from 'i18next';
import { Stack, Typography, useTheme } from '@mui/material';

interface LabelContainerProps {
  label: string;
  width?: string;
  noWrap?: boolean;
  fromIssuing?: boolean;
}

const LabelContainer: React.FC<LabelContainerProps> = ({ label, width = 'auto', noWrap = true }) => {
  const theme = useTheme();

  return (
    <Stack sx={{ width: width }}>
      <Typography color={theme.palette.text.primary} fontSize={'14px'} fontWeight={500} noWrap={noWrap}>
        {t(label)}
      </Typography>
    </Stack>
  );
};

export default LabelContainer;
