import React from 'react';
import { t } from 'i18next';
import { theme } from '../../theme';
import { StatusChipComponent } from '../ui-kit/styled';
import { SxProps } from '@mui/material';

interface StatusChipProps {
  label: string;
  onClick?: () => void;
  sx?: SxProps;
}

const StatusChip: React.FC<StatusChipProps> = ({ label, onClick, sx }) => {
  return (
    <StatusChipComponent
      label={t(label)}
      variant={'filled'}
      onClick={onClick}
      sx={{
        fontWeight: 500,
        borderRadius: theme.common.input.shape.border_radius,
        ...sx,
        '.MuiChip-label': {
          padding: '0px 4px',
        },
      }}
    />
  );
};

export default StatusChip;
