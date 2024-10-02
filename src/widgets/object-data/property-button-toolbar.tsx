import React, { useState } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import { CommentOutlined, IosShareOutlined, LayersOutlined } from '@mui/icons-material';
import { theme } from '../../theme';
import { ErrorButtonComponent, PrimaryButtonComponent, SuccessButtonComponent } from '../../shared/button/ui/ui';
import { t } from 'i18next';
import CreateCollectionModal from '../modals/create-collection-modal';
import PublishModal from '../modals/publish-modal';
import { useUser } from '../../provider/user.provider';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../../shared/enums/screen.enum';
import { PropertyStatus, UserRole } from '../../shared/api/generated-api/api.schemas';
import { useRootStore } from '../../provider/use-root-store';
import BottomCenterLimitSnackbar from '../../shared/snackbar/bottom-center-limit-snackbar';

interface PropertyButtonToolbarProps {
  setIsOpenCommentDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const PropertyButtonToolbar: React.FC<PropertyButtonToolbarProps> = ({ setIsOpenCommentDrawer }) => {
  const [isOpenCollectionModal, setIsOpenCollectionModal] = useState<boolean>(false);
  const [isOpenPublishModal, setIsOpenPublishModal] = useState<boolean>(false);
  const [isToActiveLoading, setIsToActiveLoading] = useState<boolean>(false);
  const [isToFixLoading, setIsToFixLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { propertyStore } = useRootStore();
  const { user } = useUser();
  const screen = useScreenWidth();
  const { property } = propertyStore;

  const setActiveStatus = async () => {
    setIsToActiveLoading(true);

    try {
      await propertyStore.setActiveStatus();
    } catch {
      setHasError(true);
    }

    setIsToActiveLoading(false);
  };

  const setToFixStatus = async () => {
    setIsToFixLoading(true);

    try {
      await propertyStore.setToFixStatus();
    } catch {
      setHasError(true);
    }

    setIsToFixLoading(false);
  };

  if (!property) {
    return;
  }

  return (
    <>
      <Stack flexDirection={'row'} gap={'8px'}>
        {(([UserRole.MODERATOR] as UserRole[]).includes(user.role.name) || user.id === property.responsible.id) && (
          <PrimaryButtonComponent
            onClick={() => setIsOpenCommentDrawer(true)}
            startIcon={<CommentOutlined sx={{ color: theme.base.primary.main }} />}
          >
            {screen > Screen.MOBILE && t('Comments')}
          </PrimaryButtonComponent>
        )}
        {property.status === PropertyStatus.ACTIVE && user?.id === property.responsible.id && (
          <>
            <PrimaryButtonComponent
              onClick={() => setIsOpenPublishModal(true)}
              startIcon={<IosShareOutlined sx={{ color: theme.base.primary.main }} />}
            >
              {screen > Screen.MOBILE && t('Publish')}
            </PrimaryButtonComponent>
            <PrimaryButtonComponent
              onClick={() => setIsOpenCollectionModal(true)}
              startIcon={<LayersOutlined sx={{ color: theme.base.primary.main }} />}
            >
              {screen > Screen.MOBILE && t('Collection')}
            </PrimaryButtonComponent>
          </>
        )}
        {([UserRole.MODERATOR] as UserRole[]).includes(user.role.name) &&
          property.status === PropertyStatus.PRE_LISTING && (
            <ErrorButtonComponent variant={'contained'} onClick={setToFixStatus}>
              {!isToFixLoading ? t('To fix') : <CircularProgress size={'24px'} />}
            </ErrorButtonComponent>
          )}
        {([UserRole.MODERATOR] as UserRole[]).includes(user.role.name) &&
          [PropertyStatus.PRE_LISTING, PropertyStatus.TO_FIX].includes(property.status) && (
            <SuccessButtonComponent variant={'contained'} onClick={setActiveStatus}>
              {!isToActiveLoading ? t('To active') : <CircularProgress size={'24px'} />}
            </SuccessButtonComponent>
          )}
      </Stack>
      <CreateCollectionModal isOpenModal={isOpenCollectionModal} setIsOpenModal={setIsOpenCollectionModal} />
      <PublishModal id={property.id} setIsOpenModal={setIsOpenPublishModal} isOpenModal={isOpenPublishModal} />
      {hasError && (
        <BottomCenterLimitSnackbar text={t('An error has occurred')} handleClose={() => setHasError(false)} />
      )}
    </>
  );
};

export default PropertyButtonToolbar;
