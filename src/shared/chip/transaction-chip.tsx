import React from 'react';
import { t } from 'i18next';
import { Box, Chip, Stack } from '@mui/material';
import { theme } from '../../theme';
import { FormControlLabelContainer } from '../ui-kit/styled';
import { SxProps } from '@mui/system';
import { observer } from 'mobx-react-lite';

export interface optionTransactions {
  name: string;
  value: string;
}

interface TransactionChipsProps {
  items: optionTransactions[];
  selectedItem: string | null;
  onSelectItem: (itemName: string) => void;
  label: string;
  sx?: SxProps;
  stackProps?: {
    sx?: SxProps;
  };
}

const TransactionChip: React.FC<TransactionChipsProps> = ({
  items,
  selectedItem,
  onSelectItem,
  label,
  sx,
  stackProps,
}) => {
  return (
    <Stack sx={{ display: 'flex', gap: '8px', ...stackProps?.sx }}>
      <Stack sx={{ paddingTop: theme.base.module['1'], gap: theme.base.module['0_5'] }}>
        <FormControlLabelContainer>{t(label)}</FormControlLabelContainer>
      </Stack>
      <Box sx={{ gap: '8px', display: 'flex', flexWrap: 'wrap' }}>
        {items.map((item) => (
          <Chip
            key={item.name}
            label={t(item.name)}
            variant={selectedItem === item.value ? 'filled' : 'outlined'}
            onClick={() => {
              onSelectItem(item.value);
            }}
            sx={{
              color: selectedItem === item.value ? 'white' : theme.text.primary,
              backgroundColor: selectedItem === item.value ? theme.base.primary.main : 'default',
              '&:hover': {
                backgroundColor: selectedItem === item.value ? theme.base.primary.main : 'default',
                color: selectedItem === item.value ? 'white' : 'default',
              },
              '&:active': {
                boxShadow: 'none',
              },
              '& .MuiChip-label': {
                fontSize: '16px',
                fontWeight: 400,
              },
              height: '36px',
              borderRadius: '100px',
              ...sx,
            }}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default observer(TransactionChip);
