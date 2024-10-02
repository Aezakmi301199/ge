import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../provider/use-root-store';
import { Stack } from '@mui/material';
import { t } from 'i18next';
import { useUser } from '../../../provider/user.provider';
import { CollectionResponse } from '../../../shared/api/generated-api/api.schemas';
import CollectionTypeChip from '../../../shared/chip/collection-type-chip';
import { theme } from '../../../theme';
import { HeadlineTypography_5 } from '../../../shared/typography/ui/ui';
import { useScreenWidth } from '../../../screen-width/hooks/use-screen-width';
import { Screen } from '../../../shared/enums/screen.enum';
import { ChipContainer, CollectionSection } from '../ui/ui';

interface RenderCollectionPropsGetProviderProps {
  children: (data: CollectionResponse) => React.ReactElement;
}

const RenderCollectionPropsGetProvider: React.FC<RenderCollectionPropsGetProviderProps> = observer(({ children }) => {
  const { collectionStore } = useRootStore();
  const { user, isLoading } = useUser();
  const [isActiveCollection, setIsActiveCollection] = useState<boolean>(true);
  const screen = useScreenWidth();
  const collectionTypes = [
    { label: 'Active', isActive: true },
    { label: 'Expired', isActive: false },
  ];

  useEffect(() => {
    console.log(isLoading);
    if (!isLoading) {
      collectionStore.fetchData(isActiveCollection, user?.id);
    }
  }, [isActiveCollection, collectionStore.propertiesInCollection?.name, isLoading, isActiveCollection]);

  const handleChangeCollectionType = (isActive: boolean) => {
    setIsActiveCollection(isActive);
  };

  return (
    <Stack>
      <ChipContainer marginBottom={screen <= Screen.MOBILE ? '8px' : '12px'}>
        {collectionTypes.map((item) => (
          <CollectionTypeChip
            item={item}
            key={item.label}
            isActiveCollection={isActiveCollection}
            handleChipClick={handleChangeCollectionType}
          />
        ))}
      </ChipContainer>
      <CollectionSection>
        {!collectionStore.collection.length && !collectionStore.isLoading && !collectionStore.hasError && (
          <HeadlineTypography_5
            sx={{ paddingTop: theme.layout.padding_xl, '@media (max-width: 430px)': { padding: '0 16px' } }}
          >
            {t(`You don't have ${isActiveCollection ? 'active' : 'expired'} collections`)}
          </HeadlineTypography_5>
        )}
        <> {collectionStore.collection.map((item) => children(item))}</>
      </CollectionSection>
    </Stack>
  );
});

export default RenderCollectionPropsGetProvider;
