import React, { useState } from 'react';
import { Checkbox, Modal, Stack } from '@mui/material';
import { CheckboxAndNameContainer, mainStyleAddToCollectionModal, ModalButtonContainer } from './ui/ui';
import { BodyTypography_1 } from '../../shared/typography/ui/ui';
import { t } from 'i18next';
import { CheckCircleOutlineOutlined, CircleOutlined } from '@mui/icons-material';
import { CreateButtonComponent, OutlinedWhiteButton } from '../../shared/button/ui/ui';
import { theme } from '../../theme';
import { useRootStore } from '../../provider/use-root-store';
import BottomCenterLimitSnackbar from '../../shared/snackbar/bottom-center-limit-snackbar';
import ModalHeader from './ui/modal-header';
import { targets } from '../../shared/const/targets';
import { Screen } from '../../shared/enums/screen.enum';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';

interface PublishModalProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | undefined;
}

const PublishModal: React.FC<PublishModalProps> = ({ isOpenModal, id, setIsOpenModal }) => {
  const { propertyStore } = useRootStore();
  const [hasError, setHasError] = useState<boolean>(false);
  const [isShowSnackbar, setIsShowSnackbar] = useState<boolean>(false);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const screen = useScreenWidth();

  const handleCheckboxChange = (target: string) => {
    setSelectedTarget((prevId) => (prevId === target ? null : target));
  };

  const publishProperty = async () => {
    if (!selectedTarget) {
      return;
    }

    try {
      await propertyStore.publishProperty(id, selectedTarget);
      setIsShowSnackbar(true);
    } catch (e) {
      setHasError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setIsShowSnackbar(false);
    setHasError(false);
  };

  return (
    <>
      <Modal open={isOpenModal}>
        <Stack sx={mainStyleAddToCollectionModal}>
          <ModalHeader setIsOpenModal={setIsOpenModal} text={'Publish property'} />
          <Stack sx={{ padding: '0 24px 0 24px', gap: '16px', flexGrow: 1 }}>
            <Stack
              sx={{
                height: '250px',
                overflowY: 'auto',
              }}
            >
              {targets.map((item) => (
                <CheckboxAndNameContainer key={item.target}>
                  <Checkbox
                    onChange={() => handleCheckboxChange(item.target)}
                    checked={selectedTarget === item.target}
                    sx={{ padding: '0' }}
                    disableRipple
                    checkedIcon={<CheckCircleOutlineOutlined sx={{ color: theme.base.primary.main }} />}
                    icon={<CircleOutlined sx={{ color: '#5F6368' }} />}
                  />
                  <BodyTypography_1>{item.name}</BodyTypography_1>
                </CheckboxAndNameContainer>
              ))}
            </Stack>
          </Stack>
          <ModalButtonContainer>
            <OutlinedWhiteButton
              onClick={() => setIsOpenModal(false)}
              sx={{
                backgroundColor: theme.base.default.main.button,
                border: 'none',
                width: screen < Screen.MOBILE ? '100%' : '130px',
              }}
            >
              {t('Cancel')}
            </OutlinedWhiteButton>
            <CreateButtonComponent onClick={publishProperty} variant={'contained'} sx={{ width: '130px' }}>
              {t('Publish')}
            </CreateButtonComponent>
          </ModalButtonContainer>
        </Stack>
      </Modal>
      {isShowSnackbar && !hasError && (
        <BottomCenterLimitSnackbar text={t('Object published')} hasIcon={false} handleClose={handleCloseSnackbar} />
      )}
      {hasError && (
        <BottomCenterLimitSnackbar handleClose={handleCloseSnackbar} text={t('An error has occurred')} hasIcon={true} />
      )}
    </>
  );
};

export default PublishModal;
