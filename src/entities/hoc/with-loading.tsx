import { CircularProgress, Stack } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import CollectionCard from '../../features/collection/collection-card';
import PropertyHistorySection from '../../features/property/ui/property-history-section';
import { PropertyCollection, PropertyResponse } from '../../shared/api/generated-api/api.schemas';
import { HeadlineTypography_5 } from '../../shared/typography/ui/ui';
import PhotosAndMap from '../../widgets/object-data/photos-and-map';
import PropertyInfo from '../../widgets/object-data/property-info';
import { HistoryContainer } from '../../widgets/object-data/ui/ui';

interface WithLoadingProps<T> {
  isLoading: boolean;
  data: T[] | T | null;
  noDataMessage: string;
}

interface PropertyDetailsProps {
  data: PropertyResponse | PropertyResponse[];
  id: string | undefined;
}

const withLoading = <T extends object, P extends object>(Component: React.FC<P & { data: T[] | T }>) => {
  return ({ isLoading, data, noDataMessage, ...props }: WithLoadingProps<T> & P) => {
    if (isLoading) {
      return (
        <Stack justifyContent={'center'}>
          <CircularProgress />
        </Stack>
      );
    }

    if (!data || (Array.isArray(data) && !data?.length)) {
      return <HeadlineTypography_5 sx={{ fontSize: '20px' }}>{noDataMessage}</HeadlineTypography_5>;
    }

    return <Component data={data} {...(props as P)} />;
  };
};

interface CollectionListProps {
  data: PropertyCollection[];
  collectionId?: string;
  handleDeleteProperty: (collectionId: string, propertyId: string) => Promise<void>;
}

const CollectionList: React.FC<CollectionListProps> = ({ data, collectionId, handleDeleteProperty }) => (
  <>
    {data.map((item) => (
      <CollectionCard
        key={item.property.id}
        property={item.property}
        handleDeleteProperty={async () => {
          if (collectionId) {
            await handleDeleteProperty(collectionId, item.property.id);
          }
        }}
      />
    ))}
  </>
);

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data, id }) => {
  const propertyData = Array.isArray(data) ? data[0] : data;

  if (!propertyData) {
    return null;
  }

  if (!id) {
    return null;
  }

  return (
    <>
      <PhotosAndMap attachments={propertyData.attachments} />
      <PropertyInfo property={propertyData} />
      <HistoryContainer>
        <HeadlineTypography_5>{t('History')}</HeadlineTypography_5>
        <Stack flexDirection={'column'} sx={{ backgroundColor: 'white' }}>
          <PropertyHistorySection id={id} />
        </Stack>
      </HistoryContainer>
    </>
  );
};

export const CollectionListWithLoading = withLoading(CollectionList);
export const PropertyDetailsWithLoading = withLoading<PropertyResponse, { id: string | undefined }>(PropertyDetails);
