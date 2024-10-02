import { Chip, ChipProps, styled } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../theme';
import { t } from 'i18next';
import DeleteIcon from '../../../assets/icons/ui-actions/delete/delete-icon';

interface ToggleChipStyledProps extends ChipProps {
  checked?: boolean;
  willSelect?: boolean;
  name: string;
}

interface ToggleChipProps extends Omit<ChipProps, 'onClick' | 'onDelete'> {
  checked?: boolean;
  willSelect?: boolean;
  name: string;
  onClick: (name: string) => void;
  onDelete?: (name: string) => void;
}

const ToggleChipStyled: FC<ToggleChipStyledProps> = styled(Chip)(({ ...props }: ToggleChipStyledProps) => ({
  padding: '4px',
  height: '36px',
  cursor: props.willSelect ? 'pointer' : 'default',
  backgroundColor: props.checked && props.willSelect ? theme.base.primary.main : '',
  color: props.checked && props.willSelect ? 'white' : theme.text.primary,
  border: !props.willSelect ? 'none' : '',
  '&:hover': {
    backgroundColor: props.checked && props.willSelect ? theme.base.primary.main : '',
  },
  '&:active': {
    boxShadow: !props.willSelect ? `none` : '',
  },
  '&>.MuiChip-deleteIcon': {
    // Устанавливает цвет иконки удаления
    '&:hover': {
      color: props.checked && props.willSelect ? theme.bg.clear : '',
    },
    color: props.checked && props.willSelect ? theme.bg.clear : '',
  },
  '&>.MuiChip-icon': {
    // Устанавливает Цвет иконка слева
    color: props.checked ? 'white' : 'inherit',
  },
  borderRadius: '100px',
}));

export const ToggleChip: FC<ToggleChipProps> = ({ name, icon, willSelect, checked, onClick, onDelete }) => {
  return (
    <ToggleChipStyled
      variant={checked ? 'filled' : 'outlined'}
      checked={checked}
      willSelect={true}
      key={name}
      icon={icon}
      label={t(name)}
      onClick={() => (willSelect ? onClick(name) : undefined)}
      onDelete={checked && onDelete ? () => onDelete(name) : undefined}
      deleteIcon={<DeleteIcon />}
      name={name}
    />
  );
};
