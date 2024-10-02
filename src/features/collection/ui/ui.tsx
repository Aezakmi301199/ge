import { Box, IconButton, Stack, styled } from '@mui/material';
import { theme } from '../../../theme';

export const ImagesAndPropertyCountContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '2px',
  position: 'relative',
}));

export const ActionButtonContainer = styled(IconButton)(() => ({
  position: 'absolute',
  backgroundColor: theme.base.secondary.contrast_text,
  color: theme.text.primary,
  top: '4px',
  right: '4px',
  '&:hover': {
    backgroundColor: theme.base.default.dark.button,
  },
}));

export const ChipContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '4px',
  '@media (max-width: 430px)': {
    padding: '0 16px',
    backgroundColor: 'white',
    borderRadius: '0 0 12px 12px',
    height: '48px',
    alignItems: 'center',
  },
}));

export const CollectionSection = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '24px',
  flexWrap: 'wrap',
  '@media (max-width: 430px)': {
    backgroundColor: theme.bg.bg.bg_lv,
    gap: '8px',
    minHeight: 'auto',
  },
}));

export const CollectionInfoContainer = styled(Stack)(() => ({
  gap: '8px',
  '@media (max-width: 430px)': { width: '100%' },
}));
