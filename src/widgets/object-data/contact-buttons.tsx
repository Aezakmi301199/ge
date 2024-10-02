import React, { useState } from 'react';
import { Chat } from '@mui/icons-material';
import { ContactButtonContainer, IconButtonContainer } from '../../shared/ui-kit/styled';
import { theme } from '../../theme';
import { t } from 'i18next';
import { CreateButtonComponent } from '../../shared/button/ui/ui';
import { useRootStore } from '../../provider/use-root-store';
import { observer } from 'mobx-react-lite';
import { CircularProgress } from '@mui/material';
import BottomCenterLimitSnackbar from '../../shared/snackbar/bottom-center-limit-snackbar';
import ShowModal from '../modals/ui/show-modal';

interface ContactButtonsProps {
  id: string;
}

const ContactButtons: React.FC<ContactButtonsProps> = observer(({ id }) => {
  const { propertyStore } = useRootStore();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedDealId, setSelectedDealId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isShowSnackbar, setIsShowSnackbar] = useState<boolean>(false);

  const createShow = async () => {
    if (!selectedDealId) {
      return;
    }
    setIsLoading(true);

    try {
      await propertyStore.createShowing(id, selectedDealId);
      setIsShowSnackbar(true);
    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  const handleCloseSnackbar = () => {
    setHasError(false);
    setIsShowSnackbar(false);
  };

  return (
    <ContactButtonContainer>
      <IconButtonContainer>
        <Chat sx={{ color: theme.base.primary.main, width: '20px', height: '20px' }} />
      </IconButtonContainer>
      <CreateButtonComponent onClick={() => setIsOpenModal(true)} variant={'contained'} disabled={isLoading}>
        {isLoading ? <CircularProgress size={'24px'} color={'success'} /> : t('Schedule a show')}
      </CreateButtonComponent>
      {hasError && <BottomCenterLimitSnackbar text={t('An error has occurred')} handleClose={handleCloseSnackbar} />}
      {!hasError && isShowSnackbar && (
        <BottomCenterLimitSnackbar text={t('Show has been scheduled')} handleClose={handleCloseSnackbar} />
      )}
      <ShowModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        selectedDealId={selectedDealId}
        setSelectedDealId={setSelectedDealId}
        createShow={createShow}
      />
    </ContactButtonContainer>
  );
});

export default ContactButtons;
