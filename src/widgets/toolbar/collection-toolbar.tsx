import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CloseRounded } from '@mui/icons-material';
import { Box, CircularProgress, FormControl, IconButton } from '@mui/material';
import { useRootStore } from '../../provider/use-root-store';
import { theme } from '../../theme';
import { ModalIndicatorContainer } from '../modals/ui/ui';
import { ButtonToolbarContainer, ToolbarCollectionContainer, ToolbarSection } from './ui/ui';
import { HeadlineTypography_5 } from '../../shared/typography/ui/ui';
import { t } from 'i18next';
import { PropertyResponse } from '../../shared/api/generated-api/api.schemas';
import { useUser } from '../../provider/user.provider';
import DealAutoComplete from '../../shared/autocomplete/deal-auto-complete';
import { AmountLimit } from '../../shared/enums/amount-limit.enum';
import NameTextField from '../../shared/text-field/name-text-field';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../../shared/enums/screen.enum';
import { CreateButtonComponent } from '../../shared/button/ui/ui';
import { Size } from '../../shared/enums/size.enum';

interface CollectionToolbarProps {
  children: (handleDeleteProperty: (propertyId: string) => Promise<void>) => React.ReactNode;
  setIsOpenCollectionModal?: Dispatch<SetStateAction<boolean>>;
  setSelectedCards?: Dispatch<SetStateAction<PropertyResponse[]>>;
  setHoveredCollectionId?: Dispatch<SetStateAction<string | null>>;
  errorText?: string | null;
  selectedCards: PropertyResponse[];
  collectionId?: string;
  isFromCollectionPage?: boolean;
  setIsShowSnackbar?: Dispatch<SetStateAction<boolean>>;
}

const CollectionToolbar: React.FC<CollectionToolbarProps> = observer(
  ({
    children,
    setIsOpenCollectionModal,
    setSelectedCards,
    setHoveredCollectionId,
    selectedCards,
    isFromCollectionPage,
    collectionId,
    setIsShowSnackbar,
  }) => {
    const { collectionStore } = useRootStore();
    const [collectionName, setCollectionName] = useState<string | null>('');
    const [createdCollectionId, setCreatedCollectionId] = useState<string>('');
    const user = useUser();
    const [selectedDealId, setSelectedDealId] = useState<number | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const [hasDealError, setHasDealError] = useState<boolean>(false);

    useEffect(() => {
      collectionStore.fetchDeals(user.user?.id);

      if (!collectionId) {
        return;
      }

      collectionStore.getPropertiesInCollection(collectionId).then(() => {
        setCollectionName(collectionStore.propertiesInCollection?.name || 'Collection name');
      });
    }, []);

    const handleUpdateCollectionName = async () => {
      if (collectionName) {
        if (collectionName.length < AmountLimit.FIVE || collectionName.length > AmountLimit.FIFTY) {
          setHasError(true);
          return;
        }
      }
      if (collectionName === collectionStore.propertiesInCollection?.name) {
        return;
      }

      await collectionStore.updateCollectionName(
        collectionId ? collectionId : createdCollectionId,
        collectionName || 'Collection name',
      );
      setCollectionName(collectionStore.propertiesInCollection?.name || 'Collection name');

      if (setIsShowSnackbar) {
        setIsShowSnackbar(true);
      }
    };

    const handleDeleteProperty = async (id: string | null, propertyId: string) => {
      if (setSelectedCards) {
        setSelectedCards((prevCards) => prevCards.filter((card) => card.id !== propertyId));
      }

      if (!id) {
        return;
      }

      await collectionStore.deleteProperty(id, propertyId);
    };

    const closeAndResetSelectedCards = () => {
      runInAction(() => {
        collectionStore.propertiesInCollection = null;
      });

      if (setIsOpenCollectionModal) {
        setIsOpenCollectionModal(false);
      }
      setHoveredCollectionId && setHoveredCollectionId(null);

      if (setSelectedCards) {
        setSelectedCards([]);
      }
    };

    const handleCreateCollection = async () => {
      if (collectionName) {
        if (collectionName.length < AmountLimit.FIVE || collectionName.length > AmountLimit.FIFTY) {
          setHasError(true);
        }
      }

      if (!selectedDealId) {
        setHasDealError(true);
      }

      const response = await collectionStore.createCollection(
        collectionName ? collectionName : 'Collection name',
        selectedCards.map((item) => item.id),
        selectedDealId,
      );

      setCreatedCollectionId(response);

      if (setIsShowSnackbar) {
        setIsShowSnackbar(true);
      }
    };

    const screen = useScreenWidth();

    return (
      <>
        <ToolbarSection>
          {screen < Screen.MOBILE && (
            <ButtonToolbarContainer>
              <IconButton onClick={closeAndResetSelectedCards}>
                <CloseRounded fontSize={'large'} sx={{ color: theme.action.active, width: '32px', height: '32px' }} />
              </IconButton>
              {!isFromCollectionPage ? (
                <HeadlineTypography_5>{t('New collection')}</HeadlineTypography_5>
              ) : (
                <HeadlineTypography_5>{t('Property collection')}</HeadlineTypography_5>
              )}
            </ButtonToolbarContainer>
          )}
          <ToolbarCollectionContainer>
            {!isFromCollectionPage && (
              <FormControl
                sx={{ width: screen < Screen.MOBILE ? '100%' : '214px', display: 'table' }}
                size={Size.MEDIUM}
              >
                <DealAutoComplete
                  width={screen < Screen.MOBILE ? '100%' : '300px'}
                  sx={{ height: '56px' }}
                  inputLabel='Deal number'
                  required={true}
                  deals={collectionStore.deals}
                  selectedDealId={selectedDealId}
                  setSelectedDealId={setSelectedDealId}
                  error={hasDealError}
                />
              </FormControl>
            )}
            <NameTextField
              label={'Collection name'}
              setCollectionName={setCollectionName}
              setHasError={setHasError}
              handleUpdateCollectionName={handleUpdateCollectionName}
              hasError={hasError}
              isFromCollectionPage={isFromCollectionPage}
              value={collectionName}
            />
            {!isFromCollectionPage && (
              <CreateButtonComponent
                onClick={createdCollectionId ? handleUpdateCollectionName : handleCreateCollection}
                sx={{ width: '150px', height: '40px' }}
                variant={'contained'}
              >
                {t(!createdCollectionId ? 'Create' : 'Update')}
              </CreateButtonComponent>
            )}
            {screen > Screen.MOBILE && (
              <IconButton onClick={closeAndResetSelectedCards} sx={{ bottom: '4px' }}>
                <CloseRounded fontSize={'large'} sx={{ color: theme.action.active, width: '32px', height: '32px' }} />
              </IconButton>
            )}
          </ToolbarCollectionContainer>
          <>
            {collectionStore.isLoading && (
              <ModalIndicatorContainer>
                <CircularProgress />
              </ModalIndicatorContainer>
            )}
            <Box
              className={'modal-container'}
              sx={{
                height: '430px',
                overflowY: 'auto',
                overflowX: 'hidden',
                '@media (max-width: 430px)': { height: '100%' },
              }}
            >
              {children((propertyId) => handleDeleteProperty(createdCollectionId, propertyId))}
            </Box>
          </>
        </ToolbarSection>
      </>
    );
  },
);

export default CollectionToolbar;
