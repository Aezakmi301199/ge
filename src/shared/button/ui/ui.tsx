import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { theme } from '../../../theme';
import { Size } from '../../enums/size.enum';
import { SxButtonLargeTypography } from '../../typography/ui/ui';
import { CloseRounded } from '@mui/icons-material';

interface UploadButtonProps extends ButtonProps {
  component?: React.ElementType;
}

const BaseMobileButton = styled(Button)(() => ({
  backgroundColor: theme.bg.button.dark.default,
  zIndex: 1,
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_md} ${theme.button.padding.px_md}`,
  textTransform: 'none',
  color: theme.base.primary.contrast,
  minWidth: 'fit-content',
  whiteSpace: 'nowrap',
  lineHeight: 1,
  '@media (max-width: 430px)': {
    position: 'fixed',
    bottom: '12px',
    height: '42px',
  },
  '&:hover': {
    backgroundColor: theme.bg.button.dark.hover,
  },
}));

const BaseCreateMobileButton = styled(Button)(() => ({
  minWidth: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  height: '36px',
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_md} ${theme.button.padding.px_md}`,
  border: `1px solid ${theme.base.primary.outlined_border}`,
  color: theme.base.primary.main,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.base.primary.hover,
  },
}));

const ShareMobileButton = styled(Button)(() => ({
  borderRadius: '8px',
  padding: `${theme.button.padding.py_md} ${theme.button.padding.px_md}`,
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  textTransform: 'none',
  width: '100%',
  fontWeight: 500,
  backgroundColor: theme.base.primary.main,
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.base.primary.dark,
  },
}));

export const ShareButtonComponent = styled(ShareMobileButton)(({}) => ({
  '@media (max-width: 430px)': {
    minWidth: '40px',
    width: '40px',
    height: '36px',
    padding: '6px 8px',
    '.MuiButton-startIcon': {
      margin: 0,
    },
  },
}));

export const CreateButtonComponent = styled(ShareMobileButton)(({}) => ({
  '@media (max-width: 430px)': {
    minWidth: '40px',
    width: '100%',
    height: '42px',
    padding: '6px 8px',
    '.MuiButton-startIcon': {
      margin: 0,
    },
  },
}));

export const DefaultButtonComponent = styled(Button)(({}) => ({
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_lg} ${theme.button.padding.px_lg}`,
  textTransform: 'none',
  gap: theme.gap.gap_md,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
  '@media (max-width: 430px)': {
    width: '100%',
  },
}));

export const OutlinedWhiteButton = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_md} ${theme.button.padding.px_md}`,
  gap: theme.button.gap,
  width: 'fit-content',
  boxShadow: 'none',
  color: theme.text.primary,
  border: theme.border.default,
  backgroundColor: theme.bg.button.white.default,
  '&:hover': {
    backgroundColor: theme.base.default.main.button,
    boxShadow: 'none',
  },
}));

export const UploadPhotosComponent = styled(Button)<UploadButtonProps>(() => ({
  width: '150px',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  flexDirection: 'column',
  fontSize: '14px',
  fontWeight: 400,
  border: `1px solid ${theme.base.primary.outlined_border}`,
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_lg} ${theme.button.padding.px_lg}`,
  gap: theme.button.gap,
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  color: theme.base.primary.main,
  backgroundColor: theme.base.secondary.contrast_text,
  '&:hover': {
    backgroundColor: theme.base.secondary.contrast_text,
    boxShadow: 'none',
  },
}));

export const ButtonWithIconComponent = styled(Button)(({ ...props }) => ({
  gap: '8px',
  border: theme.border.default,
  ...(props.size === Size.LARGE && {
    ...SxButtonLargeTypography,
    padding: `${theme.button.padding.py_lg} ${theme.button.padding.px_lg}`,
    '.MuiButton-startIcon': {
      marginRight: '0px',
      '*:nth-of-type(1)': {
        fontSize: theme.button.icon.icon_lg,
      },
    },
  }),
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_md} ${theme.button.padding.px_md}`,
  textTransform: 'none',
  color: theme.text.primary,
  minWidth: 'fit-content',
  whiteSpace: 'nowrap',
  lineHeight: 1,
  '&:hover': {
    border: theme.border.default,
    backgroundColor: theme.text.hover,
  },
}));

export const MobileMapButtonWithIconComponent = styled(BaseMobileButton)(() => ({
  '@media (max-width: 430px)': {
    right: '16px',
    width: '105px',
  },
}));

export const MobileFilterButtonWithIconComponent = styled(BaseMobileButton)(() => ({
  '@media (max-width: 430px)': {
    left: '16px',
    width: '100px',
  },
}));

export const AbsoluteButtonComponent = styled(Button)(() => ({
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_lg} ${theme.button.padding.px_lg}`,
  textTransform: 'none',
  color: theme.text.primary,
  backgroundColor: theme.bg.button.white.default,
  '&:hover': {
    backgroundColor: theme.base.default.main.button,
  },
}));

export const UploadDocsComponent = styled(Button)<UploadButtonProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  ...SxButtonLargeTypography,
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_lg} ${theme.button.padding.px_lg}`,
  gap: theme.button.gap,
  width: 'fit-content',
  boxShadow: 'none',
  color: theme.text.primary,
  backgroundColor: theme.base.default.main.button,
  '&:hover': {
    backgroundColor: theme.base.default.dark.button,
    boxShadow: 'none',
  },
  '@media (max-width: 430px)': {
    width: '100%',
  },
}));

export const PrimaryButtonComponent = styled(BaseCreateMobileButton)(() => ({
  '@media (max-width: 430px)': {
    minWidth: '40px',
    width: '48px',
    height: '36px',
    padding: '6px 8px',
    '.MuiButton-startIcon': {
      margin: 0,
    },
  },
}));

export const ErrorButtonComponent = styled(ShareMobileButton)(() => ({
  backgroundColor: theme.base.error.main,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.base.error.dark,
    boxShadow: 'none',
  },
}));

export const SuccessButtonComponent = styled(ShareMobileButton)(() => ({
  backgroundColor: theme.base.primary.main,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.base.primary.dark,
    boxShadow: 'none',
  },
}));

export const PrimaryMobileButtonComponent = styled(BaseCreateMobileButton)(() => ({
  '@media (max-width: 430px)': {
    minWidth: '40px',
    width: '100%',
    height: '46px',
    padding: '6px 8px',
    '.MuiButton-startIcon': {
      margin: 0,
    },
  },
}));

export const JoinDealButtonComponent = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '24px',
  height: '30px',
  borderRadius: theme.common.input.shape.border_radius,
  padding: `${theme.button.padding.py_sm} ${theme.button.padding.px_sm}`,
  gap: theme.button.gap,
  width: 'fit-content',
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  '&:hover': {
    boxShadow: 'none',
  },
}));

export const CloseRoundedButtonComponent = styled(CloseRounded)(() => ({
  width: '32px',
  height: '32px',
  color: theme.action.active,
}));
