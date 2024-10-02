import React from 'react';
import { HeadlineTypographyComponent } from './ui/ui';

interface HeadlineTypographyProps {
  text: string;
}

const HeadlineTypography: React.FC<HeadlineTypographyProps> = ({ text }) => {
  return <HeadlineTypographyComponent>{text}</HeadlineTypographyComponent>;
};

export default HeadlineTypography;
