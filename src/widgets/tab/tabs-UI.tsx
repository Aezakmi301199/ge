import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { Tabs } from '@mui/material';
import { PagePath } from '../../shared/enums/page-path.enum';
import { theme } from '../../theme';
import { StyledTab, TabControl } from './ui/ui';

type TabDataLink = {
  id: number;
  label: string;
  link: PagePath;
};

interface TabsProps {
  tabData: TabDataLink[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const TabsUI: React.FC<TabsProps> = ({ tabData, activeTab, setActiveTab }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeTabData = tabData.find((tab) => tab.link === currentPath);

    if (activeTabData) {
      setActiveTab(activeTabData.id);
    }
  }, [location.pathname, setActiveTab, tabData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const selectedTab = tabData.find((tab) => tab.id === newValue);

    if (selectedTab) {
      navigate(selectedTab.link);
    }
  };

  return (
    <TabControl sx={{ borderBottom: 1, borderColor: 'divider', '.MuiTouchRipple-root': { height: '42px' }, zIndex: 2 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: theme.text.primary,
          },
        }}
      >
        {tabData.map((tab) => (
          <StyledTab
            key={tab.id}
            value={tab.id}
            label={t(tab.label)}
            sx={{
              color: activeTab === tab.id ? theme.text.primary : theme.text.secondary,
            }}
          />
        ))}
      </Tabs>
    </TabControl>
  );
};

export default TabsUI;
