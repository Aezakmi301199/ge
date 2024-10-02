import { ArrowBackIos, IosShareOutlined, IosShareRounded } from '@mui/icons-material';
import { Divider, Stack } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supportedLngs } from './i18n/config';
import useLocalizeDocumentAttributes from './i18n/hooks/use-localize-document-attributes';
import ButtonWithIcon from './shared/button/button-with-icon';
import JoinDealButton from './shared/button/join-deal-button';
import PublishButton from './shared/button/publish-button';
import StatusChip from './shared/chip/status-chip';
import { theme } from './theme';
import FilterDrawer from './widgets/drawers/filter-drawer';
import { PagePath } from './shared/enums/page-path.enum';

function App() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useLocalizeDocumentAttributes();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <select value={i18n.resolvedLanguage} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          {Object.entries(supportedLngs).map(([code, name]) => (
            <option value={code} key={code}>
              {name}
            </option>
          ))}
        </select>
        <h2 style={{ color: 'black' }}>{t('ticket_id')}</h2>
        <h2 style={{ color: 'black' }}>{t('hello')}</h2>
        <Stack gap={'20px'}>
          <Divider />
          <PublishButton text={'Collection'} onClick={() => navigate(PagePath.COLLECTION)} />
          <PublishButton text={'Property'} onClick={() => navigate(PagePath.OBJECT)} />
          <PublishButton text={'Map'} onClick={() => navigate(PagePath.MAP)} />
          <PublishButton text={'New property'} onClick={() => navigate(PagePath.NEW_PROPERTY)} />
          <PublishButton text={'Apartments'} onClick={() => navigate(PagePath.APARTMENT)} />
          <PublishButton text={'Open drawer'} onClick={toggleDrawer()} />
          <Divider />
          <PublishButton text={'Publish'} icon={<IosShareRounded />} />
          <JoinDealButton text={'Join deal'} />
          <StatusChip label={'В работе'} />
          <ButtonWithIcon
            text={'Back to objects'}
            icon={<ArrowBackIos sx={{ color: theme.text.primary }} />}
            hasStartIcon={true}
          />
          <ButtonWithIcon
            text={'Share'}
            icon={<IosShareOutlined sx={{ color: theme.text.primary, marginLeft: theme.button.padding.py_lg }} />}
            hasStartIcon={false}
          />
        </Stack>

        <i className='icon icon-balcony' />
        <i className='icon icon-swimming-pool' />
        <FilterDrawer isOpen={isOpen} onClose={toggleDrawer()} />
      </header>
    </div>
  );
}

export default App;
