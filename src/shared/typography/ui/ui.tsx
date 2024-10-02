import { styled, Typography } from '@mui/material';
import { theme } from '../../../theme';

export const HeadlineTypographyComponent = styled(Typography)(() => ({
  fontSize: '24px',
  fontWeight: 600,
  color: theme.text.primary,
  textTransform: 'none',
  padding: '6px 0px',
  lineHeight: '32px',
}));

export const LabelTypographyComponent = styled(Typography)(() => ({
  width: '160px',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  textTransform: 'none',
  padding: theme.common.input.padding.pad_x_sm,
  height: '32px',
  color: theme.text.primary,
  minWidth: '160px',
  maxWidth: '160px',
}));

export const HeadlineTypography_4 = styled(Typography)(() => ({
  fontSize: '34px',
  color: theme.text.primary,
}));

export const HeadlineTypography_5 = styled(Typography)(() => ({
  fontSize: '24px',
  color: theme.text.primary,
  fontWeight: 600,
  lineHeight: '32px',
  '@media (max-width: 430px)': {
    fontSize: '24px',
  },
}));

export const HeadlineTypography_6 = styled(Typography)(() => ({
  fontSize: '20px',
  color: theme.text.primary,
  lineHeight: '32px',
  fontWeight: 500,
}));

export const BodyTypography_1 = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 400,
  color: theme.text.primary,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '@media (max-width: 430px)': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'wrap',
  },
}));

export const BodyTypographyMedium_1 = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 500,
  color: theme.text.primary,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '@media (max-width: 430px)': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

export const BodyTypographyMedium_2 = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
  color: theme.text.primary,
  '@media (max-width: 430px)': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

export const BodyTypography_2 = styled(Typography)(() => ({
  fontSize: '14px',
  lineHeight: '20px',
  color: theme.text.secondary,
  fontWeight: 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const ButtonMediumTypography = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  '@media (min-width: 320px) and (max-width: 430px)': {
    display: 'none',
  },
}));

export const ButtonLargeTypography = styled(Typography)(() => ({
  ...SxButtonLargeTypography,
}));

export const ButtonBadgeTypography = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
}));

export const SxButtonLargeTypography = {
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '26px',
  letterSpacing: '0.42px',
};

export const SxButtonMediumTypography = {
  fontSize: '14px',
  fontWeight: 500,
  '@media (min-width: 320px) and (max-width: 430px)': {
    display: 'none',
  },
};
