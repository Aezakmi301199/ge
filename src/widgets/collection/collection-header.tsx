import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { ArrowBackRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { PagePath } from '../../shared/enums/page-path.enum';
import { HeadlineTypography_6 } from '../../shared/typography/ui/ui';
import { theme } from '../../theme';
import { CollectionHeaderComponent } from './ui/ui';

interface CollectionHeaderProps {
  text: string;
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({ text }) => {
  const navigate = useNavigate();

  return (
    <CollectionHeaderComponent>
      <IconButton
        onClick={() => navigate(PagePath.APARTMENT)}
        size={'small'}
        sx={{ border: theme.border.default, borderRadius: '8px', padding: '4px 10px', width: '36px' }}
      >
        <ArrowBackRounded fontSize={'small'} sx={{ color: theme.text.primary }} />
      </IconButton>
      <HeadlineTypography_6>{t(text)}</HeadlineTypography_6>
    </CollectionHeaderComponent>
  );
};

export default CollectionHeader;
