import React, { FC } from 'react';
import { Box, styled, Switch as SwitchMui, SwitchProps } from '@mui/material';
import { observer } from 'mobx-react-lite';

const switchStyleBySize = {
  small: {},
  medium: {},
  large: {},
};

const StyledMuiSwitch = styled(SwitchMui)(({ ...props }) => ({
  ...(props.size ? switchStyleBySize[props.size] : switchStyleBySize['medium']),
  '&>.Mui-checked': {
    '.MuiSwitch-thumb': {
      background: 'rgba(21, 78, 249, 1)', // Цвет кружка
    },
    '&+.MuiSwitch-track': {
      background: 'rgba(21, 78, 249, 1)', // Цвет Полоски
    },
  },
  '&>.MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
    opacity: 1,
    background: 'rgba(19, 29, 53, 0.26)', // Цвет полоски при disabled
  },
  '.MuiSwitch-track': {
    background: 'rgba(19, 29, 53, 0.54)', // Цвет полоски при состоянии checked false
  },
}));

// Switch Figma - https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-–%C2%A0Base-librarie?node-id=568-3590&t=PPRywZNpO57FfF7g-0

const Switch: FC<SwitchProps> = ({ size, checked, onChange, disabled, sx }) => {
  return (
    <Box>
      <StyledMuiSwitch sx={sx} disabled={disabled} checked={checked} size={size} onChange={onChange} />
    </Box>
  );
};

export default observer(Switch);
