import React, { useState } from 'react';
import { TabLayoutData } from '../../shared/enums/tab-layout-data';
import { LayoutContainer } from '../../shared/ui-kit/styled';
import { tabLayoutData } from '../tab/tab-layout-data';
import TabsUI from '../tab/tabs-UI';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabLayoutData>(TabLayoutData.ALL_OBJECTS);

  return (
    <LayoutContainer>
      <TabsUI activeTab={activeTab} setActiveTab={setActiveTab} tabData={tabLayoutData} />
      {children}
    </LayoutContainer>
  );
};

export default Layout;
