import { t } from 'i18next';
import { Amenity } from '../../../shared/api/generated-api/api.schemas';
import AmenitiesChip from '../../../shared/chip/amenities-chip';
import LabelFilterTypography from '../../../shared/typography/label-filter-typography';
import { MainContainer } from '../../../widgets/drawers/ui/ui';

interface AmenitiesSectionProps {
  amenities: Amenity[];
  willSelect: boolean;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities, willSelect }) => {
  return (
    <MainContainer>
      <LabelFilterTypography text={t('Amenities')} />
      <AmenitiesChip amenities={amenities} willSelect={willSelect} />
    </MainContainer>
  );
};

export default AmenitiesSection;
