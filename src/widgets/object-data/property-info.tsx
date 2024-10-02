import { Box, Stack } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import DescriptionSection from '../../features/property/ui/description-section';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { PropertyResponse } from '../../shared/api/generated-api/api.schemas';
import AmenitiesChip from '../../shared/chip/amenities-chip';
import StatusChip from '../../shared/chip/status-chip';
import { PropertyStatus } from '../../shared/enums/property-status.enum';
import { Screen } from '../../shared/enums/screen.enum';
import { calculateCostSquareMeter } from '../../shared/lib/calculate-cost-square-meter';
import { capitalizeFirstLetter } from '../../shared/lib/capitalize-firser-letter';
import { convertSqmToSqft } from '../../shared/lib/convert-sqm-to-sqft';
import { getStatusColor } from '../../shared/lib/get-status-color';
import { replaceStatus } from '../../shared/lib/replace-status';
import { separateThousand } from '../../shared/lib/separate-thousand';
import { BodyTypography_1, HeadlineTypography_5, HeadlineTypography_6 } from '../../shared/typography/ui/ui';
import { theme } from '../../theme';
import ContactInfo from './contact-info';
import {
  AmenitiesAndViewContainer,
  PriceContainer,
  PropertyAddressContainer,
  PropertyInfoContainer,
  PropertyInfoSection,
  StatusAndAddressContainer,
} from './ui/ui';
import ViewList from './view-list';

interface PropertyInfoProps {
  property: PropertyResponse | null;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  const screen = useScreenWidth();

  if (!property) {
    return (
      <HeadlineTypography_5 sx={{ textAlign: 'right', width: '100%' }}>
        {t('We could not find this object')}
      </HeadlineTypography_5>
    );
  }

  return (
    <PropertyInfoContainer>
      <PropertyInfoSection>
        <StatusAndAddressContainer>
          {screen > Screen.MOBILE && (
            <StatusChip
              label={replaceStatus(property.status)}
              sx={{
                width: 'max-content',
                marginBottom: '6px',
                padding: '3px 8px',
                backgroundColor: getStatusColor(property.status),
                color:
                  property.status !== PropertyStatus.DELETED && property.status !== PropertyStatus.SUSPENDED
                    ? theme.base.primary.contrast
                    : theme.text.primary,
              }}
            />
          )}
          <PriceContainer>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={screen < Screen.MOBILE ? '100%' : 'auto'}
            >
              <HeadlineTypography_5>{separateThousand(property.price)} AED</HeadlineTypography_5>
              {screen < Screen.MOBILE && (
                <StatusChip
                  label={replaceStatus(property.status)}
                  sx={{
                    width: 'max-content',
                    marginBottom: '6px',
                    padding: '3px 8px',
                    backgroundColor: getStatusColor(property.status),
                    color:
                      property.status !== PropertyStatus.DELETED && property.status !== PropertyStatus.SUSPENDED
                        ? theme.base.primary.contrast
                        : theme.text.primary,
                  }}
                />
              )}
            </Box>
            <Stack flexDirection={'row'} gap={'8px'}>
              <BodyTypography_1 sx={{ color: theme.text.secondary }}>
                {separateThousand(
                  calculateCostSquareMeter({
                    price: property.price,
                    area: property.typeFields?.size,
                  }),
                )}
              </BodyTypography_1>
              <BodyTypography_1 sx={{ color: theme.text.secondary }}>AED / sqm</BodyTypography_1>
            </Stack>
          </PriceContainer>
          <Stack flexDirection='row' gap={'4px'}>
            <PropertyAddressContainer width={screen <= Screen.MOBILE ? '300px' : '100%'}>
              <HeadlineTypography_6 sx={{ lineHeight: '28px', color: theme.text.primary, flexWrap: 'wrap' }}>
                {property.city.name && `${property.city.name}, `}
              </HeadlineTypography_6>
              <HeadlineTypography_6 sx={{ lineHeight: '28px', color: theme.text.primary, flexWrap: 'wrap' }}>
                {property.district?.name && `${property.district?.name},`}
              </HeadlineTypography_6>
              <HeadlineTypography_6 sx={{ lineHeight: '28px', color: theme.text.primary, flexWrap: 'wrap' }}>
                {property.building?.name && `${property.building?.name}`}
              </HeadlineTypography_6>
            </PropertyAddressContainer>
            {screen <= Screen.MOBILE && (
              <img
                style={{ borderRadius: theme.border_radius.modal }}
                width={'80px'}
                height={'80px'}
                src={'https://storage.googleapis.com/pod_public/1300/161853.jpg'}
                alt={''}
              />
            )}
          </Stack>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <BodyTypography_1>{capitalizeFirstLetter(property.propertyType)}</BodyTypography_1>
            <BodyTypography_1>{convertSqmToSqft(property.typeFields?.size)} sqft</BodyTypography_1>
            <Stack sx={{ flexDirection: 'row', gap: theme.gap.gap_md }}>
              <BodyTypography_1>{String(property.typeFields?.bedroomCount)}</BodyTypography_1>
              <BodyTypography_1>Bedrooms</BodyTypography_1>
            </Stack>
            <Stack sx={{ flexDirection: 'row', gap: theme.gap.gap_md }}>
              <BodyTypography_1>{String(property.typeFields?.bathroomCount)}</BodyTypography_1>
              <BodyTypography_1>Bathrooms</BodyTypography_1>
            </Stack>
          </Box>
        </StatusAndAddressContainer>
        {screen <= Screen.MOBILE && <ContactInfo property={property} />}
        <AmenitiesAndViewContainer
          sx={{
            marginTop: screen <= Screen.MOBILE ? '0' : '48px',
          }}
        >
          <HeadlineTypography_5>{t('Amenities')}</HeadlineTypography_5>
          {!property.propertyAmenity.length ? (
            <BodyTypography_1>{t('No data')}</BodyTypography_1>
          ) : (
            <AmenitiesChip amenities={property} willSelect={false} />
          )}
        </AmenitiesAndViewContainer>
        <ViewList propertyViews={property} />
        <DescriptionSection property={property} />
      </PropertyInfoSection>
      {screen >= Screen.MOBILE && <ContactInfo property={property} />}
    </PropertyInfoContainer>
  );
};

export default PropertyInfo;
