import React from 'react';
import { t } from 'i18next';
import { CloseRounded } from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/material';
import MainSectionPropertyFilterContainer from '../../features/filter-drawer/ui/main-section-property-filter-container';
import HeadlineTypography from '../../shared/typography/headline-typography';
import { theme } from '../../theme';
import { ButtonContainer, CancelButton, FilterDrawerContainer, FindButton, HeaderContainer } from './ui/ui';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const drawerList = () => (
    <FilterDrawerContainer role={'presentation'}>
      <HeaderContainer>
        <HeadlineTypography text={t('Filters')} />
        <IconButton onClick={onClose} sx={{ padding: '0px' }}>
          <CloseRounded fontSize='large' />
        </IconButton>
      </HeaderContainer>
      <MainSectionPropertyFilterContainer />
      <ButtonContainer>
        <CancelButton onClick={onClose} fullWidth={true} variant={'contained'}>
          {t('Cancel')}
        </CancelButton>
        <FindButton fullWidth={true} variant={'contained'} color={'primary'}>
          {t('Find')}
        </FindButton>
      </ButtonContainer>
    </FilterDrawerContainer>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor={'left'}
        open={isOpen}
        sx={{
          '.MuiDrawer-paper': {
            marginLeft: '16px',
            marginTop: '16px',
            borderRadius: theme.border_radius.modal,
            height: 'calc(100% - 32px)',
          },
        }}
      >
        {drawerList()}
      </Drawer>
    </React.Fragment>
  );
};

export default FilterDrawer;
