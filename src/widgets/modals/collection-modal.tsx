import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Box, Modal, Stack } from '@mui/material';
import { PropertyResponse } from '../../shared/api/generated-api/api.schemas';
import { useRootStore } from '../../provider/use-root-store';
import CollectionCard from '../../features/collection/collection-card';
import { CardContainer, mainStyleDoubleObjectModal } from './ui/ui';
import CollectionToolbar from '../toolbar/collection-toolbar';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import ModalFooter from './ui/modal-footer';
import { CollectionListWithLoading } from '../../entities/hoc/with-loading';
import { ModalMainContainer } from '../toolbar/ui/ui';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../../shared/enums/screen.enum';
import BottomCenterLimitSnackbar from '../../shared/snackbar/bottom-center-limit-snackbar';

interface CollectionModalProps {
  selectedProperties?: PropertyResponse[];
  isOpenCollectionModal: boolean;
  setIsOpenCollectionModal: Dispatch<SetStateAction<boolean>>;
  setSelectedCards?: Dispatch<SetStateAction<PropertyResponse[]>>;
  collectionId?: string;
  isFromCollectionPage: boolean;
  setIsShowSnackbar: Dispatch<SetStateAction<boolean>>;
}

const CollectionModal: React.FC<CollectionModalProps> = observer(
  ({
    selectedProperties,
    isOpenCollectionModal,
    setIsOpenCollectionModal,
    setSelectedCards,
    collectionId,
    isFromCollectionPage,
    setIsShowSnackbar,
  }) => {
    const { collectionStore } = useRootStore();
    const screen = useScreenWidth();

    useEffect(() => {
      if (!collectionId) {
        return;
      }
      collectionStore.getPropertiesInCollection(collectionId);
    }, []);

    return (
      <>
        <Modal
          open={isOpenCollectionModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Stack sx={mainStyleDoubleObjectModal}>
            <CollectionToolbar
              isFromCollectionPage={isFromCollectionPage}
              selectedCards={selectedProperties ? selectedProperties : []}
              errorText={collectionStore.hasError ? t('Error to create collection') : null}
              setIsOpenCollectionModal={setIsOpenCollectionModal}
              setSelectedCards={setSelectedCards}
              collectionId={collectionId}
              setIsShowSnackbar={setIsShowSnackbar}
            >
              {(handleDeleteProperty) =>
                isFromCollectionPage ? (
                  <Box sx={{ marginTop: screen > Screen.MOBILE ? '16px' : '8px' }}>
                    <ModalMainContainer sx={{ padding: '0 24px' }}>
                      <CollectionListWithLoading
                        isLoading={collectionStore.isLoading}
                        data={collectionStore.propertiesInCollection?.properties || []}
                        noDataMessage={t('No properties found in the collection')}
                        collectionId={collectionId}
                        handleDeleteProperty={collectionStore.deleteProperty}
                      />
                    </ModalMainContainer>
                  </Box>
                ) : (
                  <Box sx={{ marginTop: screen > Screen.MOBILE ? '16px' : '8px' }}>
                    <ModalMainContainer>
                      <CardContainer>
                        {selectedProperties?.map((item) => {
                          return (
                            <CollectionCard
                              key={item.id}
                              property={item}
                              handleDeleteProperty={() => handleDeleteProperty(item.id)}
                            />
                          );
                        })}
                      </CardContainer>
                      <ModalFooter />
                    </ModalMainContainer>
                  </Box>
                )
              }
            </CollectionToolbar>
          </Stack>
        </Modal>
        {collectionStore.hasError && (
          <BottomCenterLimitSnackbar
            handleClose={() => (collectionStore.hasError = false)}
            text={t('An error has occurred')}
          />
        )}
      </>
    );
  },
);

export default CollectionModal;
