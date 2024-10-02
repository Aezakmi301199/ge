import { Box, Chip, IconButton, Stack, styled, TextField, ToggleButtonGroup, Typography } from '@mui/material';
import { theme } from '../../theme';

export const ImageUploadContainer = styled(Box)(() => ({
  width: '150px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  gap: theme.base.module['2'],
}));

export const UploadImageContent = styled('img')(() => ({
  width: '150px',
  height: '150px',
  borderRadius: theme.base.module[1],
  objectFit: 'cover',
}));

export const ActionContainer = styled(Stack)(() => ({
  position: 'absolute',
  top: '4px',
  right: '4px',
  flexDirection: 'row',
  gap: '10px',
}));

export const ActionButtonContainer = styled(Box)(() => ({
  width: '30px',
  height: '30px',
  backgroundColor: theme.bg.button.dark.default,
  borderRadius: '50%',
  padding: `${theme.button.padding.py_md} ${theme.button.padding.px_md}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

export const StatusChipComponent = styled(Chip)(() => ({
  height: '24px',
  backgroundColor: theme.action.selected,
  color: theme.text.primary,
}));

export const PropertyLayout = styled(Stack)(() => ({
  alignItems: 'center',
  padding: '16px 0',
  '@media (max-width: 430px)': {
    padding: '0',
  },
}));

export const PropertyContainer = styled(Stack)(() => ({
  width: '1000px',
  gap: '24px',
  '@media (max-width: 430px)': {
    width: '100%',
    backgroundColor: theme.bg.bg.bg_lv,
    gap: '8px',
  },
}));

export const PropertyInfoSection = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  '@media (max-width: 430px)': {
    padding: '8px 16px',
    borderRadius: '0 0 12px 12px ',
    backgroundColor: 'white',
  },
}));

export const FormControlLabelContainer = styled(Typography)(() => ({
  color: theme.text.primary,
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  width: '160px',
}));

export const ContactButtonContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '8px',
  gap: '8px',
  width: '100%',
}));

export const IconButtonContainer = styled(IconButton)(() => ({
  width: '48px',
  borderRadius: theme.common.input.shape.border_radius,
  padding: '6px 16px',
  border: `1px solid ${theme.base.primary.outlined_border}`,
  '@media (max-width: 430px)': {
    height: '42px',
    width: '62px',
  },
}));

export const PropertyPriceContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '16px',
  flexDirection: 'column',
  backgroundColor: theme.base.default.light.bg,
  borderRadius: theme.border_radius.modal,
}));

export const PropertyContactContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '10px',
  backgroundColor: 'white',
  borderRadius: theme.border_radius.modal,
  '@media (max-width: 430px)': {
    padding: '16px',
  },
}));

export const ContainerBlock = styled(Stack)(() => ({
  gap: theme.base.module['2_5'],
  background: '#fff',
  borderRadius: theme.border_radius.modal,
  '@media (max-width: 430px)': {
    width: '100%',
    padding: '16px',
  },
}));

export const ContainerUploadButtonBlock = styled(Stack)(() => ({
  gap: theme.base.module['1'],
  background: '#fff',
  borderRadius: theme.border_radius.modal,
  '@media (max-width: 430px)': {
    width: '100%',
    padding: '16px',
  },
}));

export const VisuallyHiddenInput = styled('input')({
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const NewPropertyContainer = styled(Stack)(() => ({
  width: '800px',
  '&>*': {
    padding: `${theme.padding.body} 0px`,
  },
  '@media (max-width: 430px)': {
    backgroundColor: theme.bg.bg.bg_lv,
    width: '100%',
    gap: '8px',
  },
  '@media (min-width: 576px) and (max-width: 767.98px)': {
    '&>*': {
      padding: theme.padding.body,
    },
    width: '70%',
  },

  '@media (min-width: 768px) and (max-width: 991.98px)': {
    width: '60%',
  },

  '@media (min-width: 992px) and (max-width: 1199.98px)': {
    width: '50%',
  },

  '@media (min-width: 1200px)': {
    width: '800px',
  },
}));

export const LayoutContainer = styled(Stack)(() => ({
  padding: '0 24px',
  '@media (max-width: 430px)': {
    padding: '0',
    backgroundColor: theme.bg.bg.bg_lv,
  },
}));

export const PropertySection = styled(Stack)(() => ({
  gap: theme.base.module['1_5'],
  '@media (max-width: 430px)': {
    width: '100%',
  },
}));

export const JumboInputWithAdornmentComponent = styled(TextField)(() => ({
  width: '300px',
  '&>.MuiOutlinedInput-root.Mui-error>.MuiOutlinedInput-notchedOutline': {
    borderColor: theme.base.error.main,
  },
  '&>.MuiFormHelperText-root.Mui-error': {
    color: theme.base.error.main,
    marginLeft: '0px',
  },
  '@media (max-width: 430px)': {
    width: '100%',
  },
}));

export const HalfWidthWrapper = styled(Box)(() => ({
  width: '50%',
}));

export const CollectionLayout = styled(Stack)(() => ({
  gap: '24px',
  flexWrap: 'wrap',
  marginTop: '65px',
  '@media (max-width: 430px)': {
    backgroundColor: theme.bg.bg.bg_lv,
    marginTop: '49px',
  },
}));

export const ToggleButtonComponent = styled(ToggleButtonGroup)(() => ({
  '.MuiToggleButton-root': {
    height: '40px',
  },
  '.MuiToggleButtonGroup-middleButton': {
    color: theme.text.primary,
    textTransform: 'none',
    fontWeight: 600,
  },
  '.MuiToggleButtonGroup-firstButton': {
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    color: theme.text.primary,
    textTransform: 'none',
    fontWeight: 600,
  },
  '.MuiToggleButtonGroup-lastButton': {
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    color: theme.text.primary,
    textTransform: 'none',
    fontWeight: 600,
  },
}));

export const ErrorTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '19.92px',
  color: theme.base.error.main,
}));
