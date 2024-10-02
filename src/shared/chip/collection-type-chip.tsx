import React from 'react';
import { t } from 'i18next';
import { Chip, SxProps } from '@mui/material';
import { theme } from '../../theme';

interface CollectionTypeChipProps {
  item: { label: string; isActive: boolean };
  isActiveCollection: boolean;
  handleChipClick: (isActive: boolean) => void;
  sx?: SxProps;
}

const CollectionTypeChip: React.FC<CollectionTypeChipProps> = ({ item, isActiveCollection, handleChipClick, sx }) => {
  return (
    <Chip
      key={item.label}
      sx={{
        ...sx,
        backgroundColor: isActiveCollection === item.isActive ? theme.base.primary.main : 'transparent',
        color: isActiveCollection === item.isActive ? 'white' : theme.text.primary,
        borderColor: isActiveCollection === item.isActive ? '' : theme.border.default,
        '&:hover': {
          backgroundColor: isActiveCollection === item.isActive ? theme.base.primary.main : 'transparent',
        },
        '@media (max-width: 430px)': {
          width: '100%',
        },
      }}
      label={t(item.label)}
      variant={isActiveCollection === item.isActive ? 'filled' : 'outlined'}
      onClick={() => handleChipClick(item.isActive)}
    />
  );
};

export default CollectionTypeChip;
