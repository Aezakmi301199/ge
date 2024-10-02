import React, { useState } from 'react';
import { t } from 'i18next';
import { AddRounded, MapOutlined, TuneRounded } from '@mui/icons-material';
import { CardContainer } from '../../features/card/ui/ui';
import ButtonWithIcon from '../../shared/button/button-with-icon';
import {
  MobileFilterButtonWithIconComponent,
  MobileMapButtonWithIconComponent,
  ShareButtonComponent,
} from '../../shared/button/ui/ui';
import PropertySelect from '../../shared/select/property-select';
import TogglePropertyButtons from '../../shared/toggle-button/toggle-property-buttons';
import { theme } from '../../theme';
import CollectionModal from '../modals/collection-modal';
import { ToolbarButtonContainer, ToolbarButtonMobileContainer, ToolbarContainer } from './ui/ui';
import {
  PropertyControllerFindByFilterOrderBy,
  PropertyControllerFindByFilterOrderDirection,
  PropertyControllerFindByFilterParams,
  PropertyResponse,
} from '../../shared/api/generated-api/api.schemas';
import BottomCenterLimitSnackbar from '../../shared/snackbar/bottom-center-limit-snackbar';
import { useRootStore } from '../../provider/use-root-store';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../../shared/enums/screen.enum';
import { Box, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../shared/enums/page-path.enum';
import { observer } from 'mobx-react-lite';

interface PropertyToolbarProps {
  children: (
    onSelect: (property: PropertyResponse, isSelected: boolean) => void,
    selectedCards: PropertyResponse[],
  ) => React.ReactNode;
}

const PropertyToolbar: React.FC<PropertyToolbarProps> = ({ children }) => {
  const { collectionStore, propertyStore } = useRootStore();
  const [selectedCards, setSelectedCards] = useState<PropertyResponse[]>([]);
  const [sortValue, setSortValue] = useState<string>('New first');
  console.log(t('New first'));
  const [isOpenCollectionModal, setIsOpenCollectionModal] = useState<boolean>(false);
  const [isShowSnackbar, setIsShowSnackbar] = useState<boolean>(false);
  const navigate = useNavigate();
  const sortMap: Record<string, Pick<PropertyControllerFindByFilterParams, 'orderBy' | 'orderDirection'>> = {
    ['New first']: {
      orderBy: PropertyControllerFindByFilterOrderBy.createdAt,
      orderDirection: PropertyControllerFindByFilterOrderDirection.desc,
    },
    ['Old first']: {
      orderBy: PropertyControllerFindByFilterOrderBy.createdAt,
      orderDirection: PropertyControllerFindByFilterOrderDirection.asc,
    },
    ['Expensive first']: {
      orderBy: PropertyControllerFindByFilterOrderBy.price,
      orderDirection: PropertyControllerFindByFilterOrderDirection.desc,
    },
    ['Cheap first']: {
      orderBy: PropertyControllerFindByFilterOrderBy.price,
      orderDirection: PropertyControllerFindByFilterOrderDirection.asc,
    },
  };
  const handleCloseSnackbar = () => {
    collectionStore.hasError = false;
    setIsShowSnackbar(false);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    propertyStore.setOrder(sortMap[event.target.value as string]);
    setSortValue(event.target.value as string);
  };

  const handleSelect = (property: PropertyResponse, isSelected: boolean) => {
    setSelectedCards((prev) => {
      if (isSelected) {
        return prev.find((p) => p.id === property.id) ? prev : [...prev, property];
      }
      return prev.filter((p) => p.id !== property.id);
    });
  };

  const handleOpenModal = () => {
    setIsOpenCollectionModal(true);
  };

  const screen = useScreenWidth();

  return (
    <>
      <ToolbarContainer>
        <ToolbarButtonContainer>
          <ShareButtonComponent
            sx={{ color: theme.base.primary.contrast }}
            startIcon={<AddRounded sx={{ color: theme.base.primary.contrast }} />}
            onClick={() => navigate(PagePath.NEW_PROPERTY)}
          >
            {screen > Screen.MOBILE ? t('Add an object') : null}
          </ShareButtonComponent>
          {screen > Screen.MOBILE && (
            <>
              <ButtonWithIcon sx={{ height: '100%' }} text={'Filters'} icon={<TuneRounded />} hasStartIcon={true} />
              {/*<ButtonWithIcon sx={{ height: '100%' }} text={'Map'} icon={<MapOutlined />} hasStartIcon={true} />*/}
            </>
          )}
          <ToolbarButtonMobileContainer>
            <PropertySelect
              sx={{ height: '36px', width: screen > Screen.MOBILE ? '185px' : '100%' }}
              values={Object.keys(sortMap)}
              value={sortValue}
              onChange={handleSortChange}
            />
          </ToolbarButtonMobileContainer>
          {selectedCards.length ? (
            <TogglePropertyButtons
              openModal={handleOpenModal}
              selectedCount={selectedCards.length}
              setSelectedCards={setSelectedCards}
            />
          ) : null}
        </ToolbarButtonContainer>
      </ToolbarContainer>
      <CardContainer>{children(handleSelect, selectedCards)}</CardContainer>
      {screen <= Screen.MOBILE && (
        <Box height={'62px'} sx={{ backgroundColor: 'white', position: 'relative', borderRadius: '12px' }}>
          <MobileFilterButtonWithIconComponent sx={{ height: '100%' }} startIcon={<MapOutlined />}>
            Map
          </MobileFilterButtonWithIconComponent>
          <MobileMapButtonWithIconComponent sx={{ height: '100%' }} startIcon={<TuneRounded />}>
            Filter
          </MobileMapButtonWithIconComponent>
        </Box>
      )}
      <CollectionModal
        setIsShowSnackbar={setIsShowSnackbar}
        selectedProperties={selectedCards}
        setSelectedCards={setSelectedCards}
        isOpenCollectionModal={isOpenCollectionModal}
        setIsOpenCollectionModal={setIsOpenCollectionModal}
        isFromCollectionPage={false}
      />
      {isShowSnackbar && !collectionStore.hasError && (
        <BottomCenterLimitSnackbar handleClose={handleCloseSnackbar} text={t('Object has been added')} />
      )}
      {collectionStore.hasError && isShowSnackbar && (
        <BottomCenterLimitSnackbar handleClose={handleCloseSnackbar} text={t('An error has occurred')} />
      )}
    </>
  );
};

export default observer(PropertyToolbar);
