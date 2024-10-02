import React from 'react';
import { Modal, Stack } from '@mui/material';
import { mainStyleAddToCollectionModal } from './ui';
import ModalHeader from './modal-header';
import DealAutoComplete from '../../../shared/autocomplete/deal-auto-complete';
import { useRootStore } from '../../../provider/use-root-store';
import { CreateButtonComponent } from '../../../shared/button/ui/ui';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';

interface ShowModalProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDealId: number | null;
  setSelectedDealId: (id: number | null) => void;
  createShow: () => void;
}

const ShowModal: React.FC<ShowModalProps> = observer(
  ({ isOpenModal, setIsOpenModal, selectedDealId, setSelectedDealId, createShow }) => {
    const { collectionStore } = useRootStore();
    return (
      <Modal open={isOpenModal}>
        <Stack sx={mainStyleAddToCollectionModal}>
          <ModalHeader setIsOpenModal={setIsOpenModal} text={'Show property'} />
          <Stack
            sx={{
              padding: '0 24px 24px 24px',
              gap: '16px',
              flexGrow: 1,
              flexDirection: 'row',
              '@media (max-width: 430px)': { flexDirection: 'column' },
            }}
          >
            <DealAutoComplete
              width={'100%'}
              inputLabel='Deal number'
              required={true}
              error={!selectedDealId}
              deals={collectionStore.deals}
              selectedDealId={selectedDealId}
              setSelectedDealId={setSelectedDealId}
            />
            <CreateButtonComponent onClick={createShow} variant={'contained'} sx={{ width: '130px' }}>
              {t('Create show')}
            </CreateButtonComponent>
          </Stack>
        </Stack>
      </Modal>
    );
  },
);

export default ShowModal;
