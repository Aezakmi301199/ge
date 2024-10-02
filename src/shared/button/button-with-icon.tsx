import { SxProps } from '@mui/material';
import { t } from 'i18next';
import { match } from 'ts-pattern';
import { Size } from '../enums/size.enum';
import { ButtonLargeTypography, ButtonMediumTypography } from '../typography/ui/ui';
import { ButtonWithIconComponent } from './ui/ui';
import React from 'react';

interface ButtonWithIconProps {
  text: string;
  onClick?: () => void;
  icon: React.ReactNode;
  hasStartIcon: boolean;
  sx?: SxProps;
  size?: Size;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  text,
  onClick,
  icon,
  hasStartIcon,
  sx,
  size = Size.LARGE,
}) => {
  return (
    <ButtonWithIconComponent
      onClick={onClick}
      startIcon={hasStartIcon ? icon : null}
      endIcon={!hasStartIcon ? icon : null}
      variant={'outlined'}
      size={size}
      sx={{
        ...sx,
      }}
    >
      {match(size)
        .with(Size.SMALL, () => <ButtonMediumTypography>{t(text)}</ButtonMediumTypography>)
        .with(Size.MEDIUM, () => <ButtonMediumTypography>{t(text)}</ButtonMediumTypography>)
        .with(Size.LARGE, () => <ButtonLargeTypography>{t(text)}</ButtonLargeTypography>)
        .otherwise(() => null)}
    </ButtonWithIconComponent>
  );
};

export default ButtonWithIcon;
