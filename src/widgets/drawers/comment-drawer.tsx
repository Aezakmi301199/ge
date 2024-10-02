import React from 'react';
import { t } from 'i18next';
import { Drawer, IconButton } from '@mui/material';
import HeadlineTypography from '../../shared/typography/headline-typography';
import { CommentDrawerContainer, HeaderContainer } from './ui/ui';
import MainSectionPropertyCommentsContainer from '../../features/comment-drawer/ui/main-section-property-comments-container';
import { theme } from '../../theme';
import { CloseRoundedButtonComponent } from '../../shared/button/ui/ui';

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({ isOpen, onClose }) => {
  const drawerList = () => (
    <CommentDrawerContainer role={'presentation'}>
      <HeaderContainer>
        <HeadlineTypography text={t('Comments')} />
        <IconButton onClick={onClose} sx={{ padding: '0px' }}>
          <CloseRoundedButtonComponent />
        </IconButton>
      </HeaderContainer>
      <MainSectionPropertyCommentsContainer />
    </CommentDrawerContainer>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor={'right'}
        open={isOpen}
        variant='persistent'
        sx={{
          '.MuiDrawer-paper': {
            width: theme.drawer.comment.width,
            '@media(max-width:430px)': {
              width: '100%',
              height: '100%',
            },
          },
        }}
      >
        {drawerList()}
      </Drawer>
    </React.Fragment>
  );
};

export default CommentDrawer;
