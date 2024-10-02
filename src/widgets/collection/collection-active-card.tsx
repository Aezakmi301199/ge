import React, { useState } from 'react';
import { CollectionContainer } from './ui/ui';
import { calculateDaysLeft } from '../../shared/lib/calculate-days-left';
import CollectionModal from '../modals/collection-modal';
import { useRootStore } from '../../provider/use-root-store';
import ActionButton from '../../features/collection/action-button';
import ImagesAndObjectCount from '../../features/collection/images-and-object-count';
import NameAndExpiresDate from '../../features/collection/name-and-expires-date';
import { CollectionInfoContainer, ImagesAndPropertyCountContainer } from '../../features/collection/ui/ui';
import type { CollectionResponse } from '../../shared/api/generated-api/api.schemas';
import BottomCenterLimitSnackbar from '../../shared/snackbar/bottom-center-limit-snackbar';
import { AmountLimit } from '../../shared/enums/amount-limit.enum';
import { t } from 'i18next';
import { getCssHoverRipple } from '../../shared/lib/mui/get-css-hover-ripple';
import { theme } from '../../theme';
import { AutorenewRounded, DeleteOutline } from '@mui/icons-material';
import DefaultButton from '../../shared/button/default-button';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../../shared/enums/screen.enum';

interface CollectionActiveCardProps {
  data: CollectionResponse;
}

const CollectionActiveCard: React.FC<CollectionActiveCardProps> = ({ data }) => {
  const { collectionStore } = useRootStore();
  const [isOpenCollectionModal, setIsOpenCollectionModal] = useState<boolean>(false);
  const [collectionId, setCollectionId] = useState<string | undefined>(undefined);
  const [hoveredCollectionId, setHoveredCollectionId] = useState<string | null>(null);
  const [isShowSnackbar, setIsShowSnackbar] = useState<boolean>(false);
  const screen = useScreenWidth();

  const handleCloseSnackbar = () => {
    collectionStore.hasError = false;
    setIsShowSnackbar(false);
  };

  const expireCollection = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    await collectionStore.expireCollection(id);
  };

  const handleOpenCollectionModal = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setCollectionId(id);
    setIsOpenCollectionModal(true);
  };

  const renewCollection = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    await collectionStore.renewCollection(id);
  };

  return (
    <CollectionContainer
      sx={{ cursor: calculateDaysLeft(data.expiresAt) > AmountLimit.FIRST ? 'pointer' : 'default' }}
      onMouseEnter={() => setHoveredCollectionId(data.id)}
      onMouseLeave={() => setHoveredCollectionId(null)}
    >
      <CollectionInfoContainer
        onClick={
          calculateDaysLeft(data.expiresAt) > AmountLimit.FIRST
            ? (event) => handleOpenCollectionModal(data.id, event)
            : undefined
        }
      >
        <ImagesAndPropertyCountContainer>
          <ImagesAndObjectCount data={data} />
          {hoveredCollectionId === data.id && screen > Screen.MOBILE && (
            <ActionButton data={data} expireCollection={expireCollection} renewCollection={renewCollection} />
          )}
        </ImagesAndPropertyCountContainer>
        <NameAndExpiresDate data={data} hoveredCollectionId={hoveredCollectionId} />
        {screen <= Screen.MOBILE && (
          <DefaultButton
            text={t(calculateDaysLeft(data.expiresAt) > AmountLimit.FIRST ? 'Delete' : 'Restore')}
            color={'primary'}
            onClick={
              calculateDaysLeft(data.expiresAt) > AmountLimit.FIRST
                ? (event) => expireCollection(data.id, event)
                : (event) => renewCollection(data.id, event)
            }
            sx={{
              ...getCssHoverRipple(theme.base.default.main.button),
              color: theme.text.text_dark,
            }}
          >
            {calculateDaysLeft(data.expiresAt) ? <DeleteOutline /> : <AutorenewRounded />}
          </DefaultButton>
        )}
      </CollectionInfoContainer>
      {collectionId && (
        <CollectionModal
          setIsShowSnackbar={setIsShowSnackbar}
          collectionId={collectionId}
          isOpenCollectionModal={isOpenCollectionModal}
          setIsOpenCollectionModal={setIsOpenCollectionModal}
          isFromCollectionPage={true}
        />
      )}
      {isShowSnackbar && !collectionStore.hasError && (
        <BottomCenterLimitSnackbar handleClose={handleCloseSnackbar} text={t('Collection has been updated')} />
      )}
    </CollectionContainer>
  );
};

export default CollectionActiveCard;
