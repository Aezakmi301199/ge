import { Snackbar, Stack } from '@mui/material';
import { BodyTypography_2 } from '../../../shared/typography/ui/ui';
import { theme } from '../../../theme';
import { FC } from 'react';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';

interface SnackbarPropertyFormProps {
  handleClose: () => void;
  open: boolean;
  helperText: string;
}

export const SnackbarPropertyForm: FC<SnackbarPropertyFormProps> = observer(({ handleClose, open, helperText }) => {
  return (
    <Snackbar
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      sx={{
        '&': {
          position: 'absolute',
          left: '122%',
          bottom: '-4px',
        },
        '.MuiSnackbarContent-root': {
          width: 'fit-content',
          minWidth: 'auto',
          backgroundColor: '#1A1A1A',
        },
      }}
      message={
        <Stack flexDirection={'row'} alignItems={'center'} gap={'8px'} height={'14px'}>
          <BodyTypography_2 sx={{ color: theme.text.white }}>{t(helperText)}</BodyTypography_2>
        </Stack>
      }
    />
  );
});
