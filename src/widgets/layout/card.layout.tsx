import React from 'react';
import { Stack } from '@mui/material';

interface CardLayoutProps {
  children: React.ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  return <Stack sx={{ padding: '16px 24px 0 24px' }}>{children}</Stack>;
};

export default CardLayout;
