import React from 'react';
import { observer } from 'mobx-react-lite';
import Card from '../features/card/card';
import RenderPropsGetProvider from '../features/property/provider/render-property-props-get-provider';
import { useRootStore } from '../provider/use-root-store';
import PropertyToolbar from '../widgets/toolbar/property-toolbar';

const PropertiesPage = observer(() => {
  const { propertyStore } = useRootStore();

  return (
    <PropertyToolbar>
      {(onSelect, selectedCards) => (
        <RenderPropsGetProvider store={propertyStore}>
          {(data) => <Card key={data.id} property={data} onSelect={onSelect} selectedCards={selectedCards} />}
        </RenderPropsGetProvider>
      )}
    </PropertyToolbar>
  );
});

export default PropertiesPage;
