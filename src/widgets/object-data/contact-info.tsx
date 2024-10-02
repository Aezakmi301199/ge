import React from 'react';
import { Avatar, Stack } from '@mui/material';
import { PropertyContactContainer } from '../../shared/ui-kit/styled';
import ContactButtons from './contact-buttons';
import { BodyTypography_1, HeadlineTypography_5, HeadlineTypography_6 } from '../../shared/typography/ui/ui';
import { environments } from '../../environment';
import { useRootStore } from '../../provider/use-root-store';
import { theme } from '../../theme';
import { capitalizeFirstLetter } from '../../shared/lib/capitalize-firser-letter';
import { PropertyResponse } from '../../shared/api/generated-api/api.schemas';
import { ContactInfoContainer } from './ui/ui';

interface ContactInfoProps {
  property: Pick<PropertyResponse, 'price' | 'responsible' | 'typeFields' | 'id'>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ property }) => {
  const { authStore } = useRootStore();

  if (!property) {
    return <HeadlineTypography_5>Не удалось получить контактную информацию</HeadlineTypography_5>;
  }

  return (
    <ContactInfoContainer>
      <PropertyContactContainer>
        <Avatar src={`${environments.VITE_BITRIX_CDN}${property.responsible.photo}`} />
        <Stack sx={{ width: '100%' }}>
          <HeadlineTypography_6 sx={{ color: theme.link.default, cursor: 'pointer' }}>
            {property.responsible.name} {property.responsible.surname}
          </HeadlineTypography_6>
          <BodyTypography_1>{capitalizeFirstLetter(authStore.user?.role.name)}</BodyTypography_1>
          <ContactButtons id={property.id} />
        </Stack>
      </PropertyContactContainer>
    </ContactInfoContainer>
  );
};

export default ContactInfo;
