import React from 'react';
import RenderCollectionPropsGetProvider from '../features/collection/provider/render-collection-props-get-provider';
import { CollectionLayout } from '../shared/ui-kit/styled';
import CollectionActiveCard from '../widgets/collection/collection-active-card';

const CollectionPage: React.FC = () => {
  return (
    <CollectionLayout>
      <RenderCollectionPropsGetProvider>
        {(data) => <CollectionActiveCard key={data.id} data={data} />}
      </RenderCollectionPropsGetProvider>
    </CollectionLayout>
  );
};

export default CollectionPage;
