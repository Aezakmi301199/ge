import { Box, Stack, styled } from '@mui/material';

export const mainStyleDoubleObjectModal = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '890px',
  borderRadius: '12px',
  height: '500px',
  background: '#FFF',
  padding: '24px 0 0 0',
  '@media (max-width: 430px)': {
    width: '100%',
    height: '100%',
    padding: '0',
    borderRadius: '0',
  },
};

export const ModalFooterContainer = styled(Stack)(() => ({
  padding: '24px',
  backgroundColor: '#3c70fa',
  borderRadius: '12px',
  width: '100%',
  '@media (max-width: 430px)': {
    borderRadius: '12px 12px 0 0',
    padding: '24px 16px',
  },
}));

export const LinkContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '6px 16px',
  borderRadius: '12px',
  gap: '8px',
  minWidth: '680px',
  maxWidth: '700px',
  '@media (max-width: 430px)': {
    minWidth: '100%',
  },
}));

export const ModalIndicatorContainer = styled(Box)(() => ({
  width: '100%',
  position: 'absolute',
  top: '50%',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1,
}));

export const mainStyleAddToCollectionModal = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '580px',
  borderRadius: '12px',
  height: 'auto',
  background: '#FFF',
  '@media (max-width: 430px)': {
    width: '100%',
    height: '100%',
    borderRadius: '0',
  },
};

export const ModalHeaderContainer = styled(Stack)(() => ({
  padding: '16px 24px 8px 24px',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
}));

export const CheckboxAndNameContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  padding: '8px 0',
  gap: '8px',
}));

export const ModalButtonContainer = styled(Stack)(() => ({
  padding: '16px 24px',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'row',
}));

export const DetailsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
  },
}));

export const CardContainer = styled(Stack)(() => ({
  padding: '0 24px',
  flexDirection: 'row',
  gap: '16px',
  flexWrap: 'wrap',
  '@media (max-width: 430px)': {
    padding: '0',
    gap: '8px',
    flexDirection: 'column',
    width: '100%',
  },
}));

export const ButtonLinkContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
  },
}));
