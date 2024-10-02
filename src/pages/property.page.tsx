import { ArrowBackIos } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PropertyDetailsWithLoading } from '../entities/hoc/with-loading';
import { useRootStore } from '../provider/use-root-store';
import ButtonWithIcon from '../shared/button/button-with-icon';
import { PagePath } from '../shared/enums/page-path.enum';
import { PropertyContainer, PropertyInfoSection, PropertyLayout } from '../shared/ui-kit/styled';
import { theme } from '../theme';
import PropertyButtonToolbar from '../widgets/object-data/property-button-toolbar';
import CommentDrawer from '../widgets/drawers/comment-drawer';
import { useTheme } from '@mui/material/styles';
import { useScreenWidth } from '../screen-width/hooks/use-screen-width';

const PropertyPage = observer(() => {
  const muiTheme = useTheme();
  const { id } = useParams();
  const { propertyStore, historyStore } = useRootStore();
  const navigate = useNavigate();
  const screen = useScreenWidth();
  const [isOpenCommentDrawer, setIsOpenCommentDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      propertyStore.fetchPropertyById(id);
    }

    historyStore.resetHistory();
  }, []);

  return (
    <PropertyLayout>
      <PropertyContainer
        sx={
          isOpenCommentDrawer
            ? {
                marginRight: theme.drawer.comment.width,
                transition: muiTheme.transitions.create('margin', {
                  easing: muiTheme.transitions.easing.sharp,
                  duration: muiTheme.transitions.duration.leavingScreen,
                }),
              }
            : {
                marginRight: 0,
                transition: muiTheme.transitions.create('margin', {
                  easing: muiTheme.transitions.easing.easeOut,
                  duration: muiTheme.transitions.duration.enteringScreen,
                }),
              }
        }
      >
        <PropertyInfoSection>
          <ButtonWithIcon
            sx={{
              height: '36px',
            }}
            onClick={() => {
              propertyStore.resetProperty();
              navigate(PagePath.EMPTY_PATH);
            }}
            text={'Back to objects'}
            icon={<ArrowBackIos sx={{ color: theme.text.primary, fontSize: '12px !important' }} />}
            hasStartIcon={true}
          />
          {propertyStore.property && <PropertyButtonToolbar setIsOpenCommentDrawer={setIsOpenCommentDrawer} />}
        </PropertyInfoSection>
        <PropertyDetailsWithLoading
          isLoading={propertyStore.isLoading}
          data={propertyStore.property}
          noDataMessage='No property details found'
          id={id}
        />
      </PropertyContainer>
      <CommentDrawer isOpen={isOpenCommentDrawer} onClose={() => setIsOpenCommentDrawer(false)} />
    </PropertyLayout>
  );
});

export default PropertyPage;
