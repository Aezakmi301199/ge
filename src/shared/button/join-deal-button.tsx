import React from 'react';
import { t } from 'i18next';
import { InsertLinkRounded } from '@mui/icons-material';
import { JoinDealButtonComponent } from './ui/ui';

interface JoinDealButtonProps {
  text: string;
  onclick?: () => void;
}

const JoinDealButton: React.FC<JoinDealButtonProps> = ({ text, onclick }) => {
  return (
    <JoinDealButtonComponent variant={'outlined'} onClick={onclick} startIcon={<InsertLinkRounded />}>
      {t(text)}
    </JoinDealButtonComponent>
  );
};

export default JoinDealButton;
