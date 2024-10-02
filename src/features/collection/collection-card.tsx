import React from 'react';
import { CardBox, CardsContainer } from '../card/ui/ui';
import PropertyImageSlider from '../../shared/slider/property-image-slider';
import StatusChip from '../../shared/chip/status-chip';
import { replaceStatus } from '../../shared/lib/replace-status';
import { theme } from '../../theme';
import InfoContent from '../card/info-content';
import { DeleteOutline, DeleteOutlineRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { PropertyResponse } from '../../shared/api/generated-api/api.schemas';
import { observer } from 'mobx-react-lite';
import { getStatusColor } from '../../shared/lib/get-status-color';
import { PropertyStatus } from '../../shared/enums/property-status.enum';
import DefaultButton from '../../shared/button/default-button';
import { t } from 'i18next';
import { getCssHoverRipple } from '../../shared/lib/mui/get-css-hover-ripple';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../../shared/enums/screen.enum';

interface CollectionCardProps {
  property: PropertyResponse;
  handleDeleteProperty: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = observer(({ property, handleDeleteProperty }) => {
  const screen = useScreenWidth();
  return (
    <CardsContainer>
      <CardBox>
        <PropertyImageSlider attachments={property.attachments} />
        <StatusChip
          label={replaceStatus(property.status)}
          sx={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            padding: '3px 8px',
            backgroundColor: getStatusColor(property.status),
            color:
              property.status !== PropertyStatus.DELETED && property.status !== PropertyStatus.SUSPENDED
                ? theme.base.primary.contrast
                : theme.text.primary,
          }}
        />
        <InfoContent property={property} />
        {screen < Screen.MOBILE ? (
          <DefaultButton
            text={t('Remove object')}
            color={'primary'}
            onClick={handleDeleteProperty}
            sx={{
              marginTop: '16px',
              ...getCssHoverRipple(theme.base.default.main.button),
              color: theme.text.text_dark,
            }}
          >
            <DeleteOutline />
          </DefaultButton>
        ) : (
          <IconButton
            onClick={handleDeleteProperty}
            size={'medium'}
            sx={{
              backgroundColor: `${theme.base.secondary.contrast_text} !important`,
              position: 'absolute',
              top: '8px',
              right: '8px',
            }}
          >
            <DeleteOutlineRounded fontSize={'medium'} sx={{ color: theme.text.primary }} />
          </IconButton>
        )}
      </CardBox>
    </CardsContainer>
  );
});

export default CollectionCard;
