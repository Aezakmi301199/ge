// Card.tsx
import React from 'react';
import { Avatar, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { AvatarAndCheckboxControl, CardBox, CardsContainer } from './ui/ui';
import { PropertyResponse } from '../../shared/api/generated-api/api.schemas';
import { environments } from '../../environment';
import { PropertyStatus } from '../../shared/enums/property-status.enum';
import { theme } from '../../theme';
import { t } from 'i18next';
import InfoContent from './info-content';
import { getStatusColor } from '../../shared/lib/get-status-color';
import PropertyImageSlider from '../../shared/slider/property-image-slider';
import StatusChip from '../../shared/chip/status-chip';
import { replaceStatus } from '../../shared/lib/replace-status';
import { PagePath } from '../../shared/enums/page-path.enum';
import { useNavigate } from 'react-router-dom';
import { CheckBoxOutlined } from '@mui/icons-material';

interface CardProps {
  property: PropertyResponse;
  onSelect: (property: PropertyResponse, isSelected: boolean) => void;
  selectedCards: PropertyResponse[];
}

const Card: React.FC<CardProps> = ({ property, onSelect, selectedCards }) => {
  const isSelected = selectedCards.some((p) => p.id === property.id);
  const navigate = useNavigate();

  return (
    <CardsContainer sx={{ cursor: 'pointer' }}>
      <CardBox onClick={() => navigate(`${PagePath.PROPERTY}/${property.id}`)}>
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
        <AvatarAndCheckboxControl>
          <Avatar src={`${environments.VITE_BITRIX_CDN}${property.responsible.photo}`} />
          {property.status === PropertyStatus.ACTIVE && !property.isDraft && (
            <Stack sx={{ flexDirection: 'row' }}>
              <FormControlLabel
                onClick={(event) => event.stopPropagation()}
                value='object'
                sx={{ color: theme.text.primary }}
                control={
                  <Checkbox
                    checkedIcon={<CheckBoxOutlined sx={{ color: theme.base.primary.main }} />}
                    checked={isSelected}
                    disableRipple
                    onChange={() => onSelect(property, !isSelected)}
                  />
                }
                label={t('Select an object')}
                labelPlacement='start'
              />
            </Stack>
          )}
        </AvatarAndCheckboxControl>
      </CardBox>
    </CardsContainer>
  );
};

export default Card;
