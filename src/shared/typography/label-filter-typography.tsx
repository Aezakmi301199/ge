import React from 'react';
import { SxProps } from '@mui/system';
import { LabelTypographyComponent } from './ui/ui';

interface LabelFilterTypographyProps {
  text: string;
  sx?: SxProps;
}

const LabelFilterTypography: React.FC<LabelFilterTypographyProps> = ({ text, sx }) => {
  return <LabelTypographyComponent sx={sx}>{text}</LabelTypographyComponent>;
};

export default LabelFilterTypography;
