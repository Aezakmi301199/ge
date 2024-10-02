import React, { Dispatch, SetStateAction } from 'react';
import { t } from 'i18next';
import { CloseRounded, LayersRounded } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import { ButtonBadgeTypography, ButtonMediumTypography } from '../typography/ui/ui';
import { TogglePropertyButtonComponent, TogglePropertyContainer } from './ui/ui';
import { PropertyResponse } from '../api/generated-api/api.schemas';

interface TogglePropertyButtonsProps {
  selectedCount: number;
  setSelectedCards: Dispatch<SetStateAction<PropertyResponse[]>>;
  openModal: () => void;
}

const TogglePropertyButtons: React.FC<TogglePropertyButtonsProps> = ({
  selectedCount,
  setSelectedCards,
  openModal,
}) => {
  return (
    <TogglePropertyContainer>
      <TogglePropertyButtonComponent>
        <ToggleButton value={'reset'} onClick={() => setSelectedCards([])}>
          <CloseRounded fontSize={'small'} />
        </ToggleButton>
        <ToggleButton value={'collection'} onClick={openModal}>
          <LayersRounded />
          <ButtonMediumTypography>{t('Create collection')}</ButtonMediumTypography>
          <ButtonBadgeTypography>{selectedCount}</ButtonBadgeTypography>
        </ToggleButton>
      </TogglePropertyButtonComponent>
    </TogglePropertyContainer>
  );
};

export default TogglePropertyButtons;
