import React from 'react';
import { environments } from '../../environment';
import { CollectionImage } from '../../widgets/collection/ui/ui';
import noImage from '../../assets/images/no-image-small.svg';
import StatusChip from '../../shared/chip/status-chip';
import { theme } from '../../theme';
import type { CollectionResponse } from '../../shared/api/generated-api/api.schemas';
import { t } from 'i18next';
import { getItemDeclension } from '../../shared/lib/get-item-declision';

interface ImagesAndObjectCountProps {
  data: CollectionResponse;
}

const ImagesAndObjectCount: React.FC<ImagesAndObjectCountProps> = ({ data }) => {
  return (
    <>
      {data.properties.slice(0, 2).map((property) => {
        const firstAttachmentUrl = property.property.attachments.length
          ? `${environments.VITE_ESOFT_CDN}${property.property.attachments[0].url}`
          : noImage;

        return data.properties.length === 1 ? (
          <CollectionImage sx={{ width: '260px' }} key={property.property.id} src={firstAttachmentUrl} alt='' />
        ) : (
          <CollectionImage key={property.property.id} src={firstAttachmentUrl} alt='' />
        );
      })}
      {!data.properties.length && (
        <CollectionImage sx={{ width: '260px', '@media (max-width: 430px)': { width: '100%' } }} src={noImage} alt='' />
      )}
      <StatusChip
        sx={{
          position: 'absolute',
          bottom: '4px',
          left: '4px',
          borderRadius: '100px',
          backgroundColor: theme.bg.bg.dark,
          color: theme.text.white,
          padding: '3px',
        }}
        label={getItemDeclension(data.properties.length, [t('object'), t('objects'), t('objects')])}
      />
    </>
  );
};

export default ImagesAndObjectCount;
