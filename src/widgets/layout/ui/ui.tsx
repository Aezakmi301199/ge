import { Stack, styled } from '@mui/material';

export const ObjectLayoutContainer = styled(Stack)(() => ({
  padding: '0 24px',
  '@media (max-width: 430px)': {
    padding: '0',
  },
}));
