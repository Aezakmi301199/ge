import React, { useEffect, useState } from 'react';
import { Checkbox, Modal, Stack } from '@mui/material';
import {
  CheckboxAndNameContainer,
  DetailsContainer,
  mainStyleAddToCollectionModal,
  ModalButtonContainer,
} from './ui/ui';
import { BodyTypography_1, HeadlineTypography_5 } from '../../shared/typography/ui/ui';
import { CheckCircleOutlineOutlined, CircleOutlined } from '@mui/icons-material';
import { CreateButtonComponent, OutlinedWhiteButton, PrimaryMobileButtonComponent } from '../../shared/button/ui/ui';
import { t } from 'i18next';
import { theme } from '../../theme';
import { useRootStore } from '../../provider/use-root-store';
import { useParams } from 'react-router-dom';
import BottomCenterLimitSnackbar from '../../shared/snackbar/bottom-center-limit-snackbar';
import DealAutoComplete from '../../shared/autocomplete/deal-auto-complete';
import { useUser } from '../../provider/user.provider';
import ModalHeader from './ui/modal-header';
import { observer } from 'mobx-react-lite';
import NameTextField from '../../shared/text-field/name-text-field';
import { Screen } from '../../shared/enums/screen.enum';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';

interface CreateCollectionModalProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = observer(({ isOpenModal, setIsOpenModal }) => {
  const { authStore, collectionStore } = useRootStore();
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const { id } = useParams();
  const [isShowSnackbar, setIsShowSnackbar] = useState<boolean>(false);
  const [isNewCollection, setIsNewCollection] = useState<boolean>(false);
  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [selectedDealId, setSelectedDealId] = useState<number | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const user = useUser();
  const screen = useScreenWidth();

  const handleCheckboxChange = (target: string) => {
    setCollectionId((prevId) => (prevId === target ? null : target));
  };

  useEffect(() => {
    collectionStore.fetchDeals(user.user?.id);
    collectionStore.fetchData(true, authStore.user?.id);
  }, [collectionId]);

  const addPropertyToCollection = async () => {
    if (!id || !collectionId) {
      return;
    }

    await collectionStore.addPropertyToCollection(collectionId, id).then(() => {
      setIsShowSnackbar(true);
    });
  };

  const createCollection = async () => {
    if (!id) {
      return;
    }

    await collectionStore
      .createCollection(collectionName ?? 'Collection name', [id], selectedDealId)
      .then((collectionId) => {
        setCollectionId(collectionId);
        setIsNewCollection(true);
        setIsShowSnackbar(true);
      });
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    collectionStore.hasError = false;
    setIsShowSnackbar(false);
  };

  const handleCloseSnackbar = () => {
    collectionStore.hasError = false;
    setIsShowSnackbar(false);
  };

  return (
    <>
      <Modal open={isOpenModal}>
        <Stack sx={mainStyleAddToCollectionModal}>
          <ModalHeader setIsOpenModal={handleCloseModal} text={'Create collection'} />
          <Stack sx={{ padding: '0 24px 0 24px', gap: '16px', flexGrow: 1 }}>
            {isNewCollection ? (
              <DetailsContainer>
                <DealAutoComplete
                  width={screen < Screen.MOBILE ? '100%' : '200px'}
                  inputLabel='Deal number'
                  required={true}
                  error={!selectedDealId}
                  deals={collectionStore.deals}
                  selectedDealId={selectedDealId}
                  setSelectedDealId={setSelectedDealId}
                />
                <NameTextField
                  label={'Collection name'}
                  setCollectionName={setCollectionName}
                  setHasError={setHasError}
                  handleUpdateCollectionName={(event) => setCollectionName(event.target.value)}
                  hasError={hasError}
                  isFromCollectionPage={false}
                  value={collectionName}
                  sx={{ width: screen < Screen.MOBILE ? '100%' : '260px' }}
                />
                <PrimaryMobileButtonComponent
                  onClick={createCollection}
                  variant={'outlined'}
                  color={'primary'}
                  size={'large'}
                  sx={{
                    width: screen < Screen.MOBILE ? '100%' : '90px',
                    height: screen < Screen.MOBILE ? '50px' : '40px',
                  }}
                >
                  {t('Create')}
                </PrimaryMobileButtonComponent>
              </DetailsContainer>
            ) : (
              <PrimaryMobileButtonComponent
                variant={'outlined'}
                color={'primary'}
                sx={{ width: '125px' }}
                onClick={() => setIsNewCollection(true)}
              >
                {t('New collection')}
              </PrimaryMobileButtonComponent>
            )}
            <Stack
              sx={{
                height: '250px',
                overflowY: 'auto',
              }}
            >
              {collectionStore.collection.length ? (
                <>
                  {collectionStore.collection?.map((item) => (
                    <CheckboxAndNameContainer key={item.id}>
                      <Checkbox
                        onChange={() => handleCheckboxChange(item.id)}
                        checked={collectionId === item.id}
                        sx={{ padding: '0' }}
                        disableRipple
                        checkedIcon={<CheckCircleOutlineOutlined sx={{ color: theme.base.primary.main }} />}
                        icon={<CircleOutlined sx={{ color: '#5F6368' }} />}
                      />
                      <BodyTypography_1>{item.name}</BodyTypography_1>
                    </CheckboxAndNameContainer>
                  ))}
                </>
              ) : (
                <HeadlineTypography_5 sx={{ fontSize: '20px' }}>
                  {t(`You don't have active collections`)}
                </HeadlineTypography_5>
              )}
            </Stack>
          </Stack>
          <ModalButtonContainer>
            <OutlinedWhiteButton
              onClick={() => setIsOpenModal(false)}
              sx={{
                backgroundColor: theme.base.default.main.button,
                border: 'none',
                width: screen < Screen.MOBILE ? '100%' : '130px',
                height: '42px',
              }}
            >
              {t('Cancel')}
            </OutlinedWhiteButton>
            <CreateButtonComponent
              onClick={addPropertyToCollection}
              variant={'contained'}
              sx={{ width: '130px', height: '42px' }}
            >
              {t('Add')}
            </CreateButtonComponent>
          </ModalButtonContainer>
        </Stack>
      </Modal>
      {isShowSnackbar && !collectionStore.hasError && (
        <BottomCenterLimitSnackbar handleClose={handleCloseSnackbar} text={t('Object has been added')} />
      )}
      {collectionStore.hasError && (
        <BottomCenterLimitSnackbar handleClose={handleCloseSnackbar} text={t('An error has occurred')} />
      )}
    </>
  );
});

export default CreateCollectionModal;
