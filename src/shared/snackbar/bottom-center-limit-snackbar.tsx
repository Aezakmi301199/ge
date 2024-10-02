import React from 'react';
import { LayersOutlined } from '@mui/icons-material';
import { Snackbar, Stack, SxProps } from '@mui/material';
import { theme } from '../../theme';
import { BodyTypography_2 } from '../typography/ui/ui';
import { t } from 'i18next';

interface BottomCenterLimitSnackbarProps {
  text: string | null;
  hasIcon?: boolean;
  handleClose?: () => void;
  sx?: SxProps;
}

const BottomCenterLimitSnackbar: React.FC<BottomCenterLimitSnackbarProps> = ({
  text,
  hasIcon = true,
  handleClose,
  sx,
}) => {
  return (
    <Snackbar
      autoHideDuration={2000}
      onClose={handleClose}
      sx={{
        '.MuiSnackbarContent-root': {
          minWidth: '192px',
          boxShadow: 'none',
          backgroundColor: '#1A1A1A',
          justifyContent: 'center',
        },
        ...sx,
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
      message={
        <Stack flexDirection={'row'} alignItems={'center'} gap={'8px'} height={'14px'}>
          {hasIcon && <LayersOutlined />}
          <BodyTypography_2 sx={{ color: theme.text.white }}>{t(text ?? '')}</BodyTypography_2>
        </Stack>
      }
    />
  );
};

export default BottomCenterLimitSnackbar;
