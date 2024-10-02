import React from 'react';
import { t } from 'i18next';
import ToggleFilterButtons from '../../../shared/toggle-button/toggle-filter-buttons';
import { MainContainer } from '../../../widgets/drawers/ui/ui';

interface RoomAndBathroomSectionProps {
  bedrooms: string[];
  bathrooms: string[];
}

const RoomAndBathroomSection: React.FC<RoomAndBathroomSectionProps> = ({ bathrooms, bedrooms }) => {
  return (
    <>
      <MainContainer>
        <ToggleFilterButtons text={t('Bedrooms')} values={bedrooms} showStudioOption={true} />
      </MainContainer>
      <MainContainer>
        <ToggleFilterButtons text={t('Bathrooms')} values={bathrooms} showStudioOption={false} />
      </MainContainer>
    </>
  );
};

export default RoomAndBathroomSection;
