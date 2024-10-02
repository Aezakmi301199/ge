import React from 'react';
import { ObjectLayoutContainer } from './ui/ui';

interface ObjectLayoutProps {
  children: React.ReactNode;
}

const ObjectLayout: React.FC<ObjectLayoutProps> = ({ children }) => {
  return <ObjectLayoutContainer>{children}</ObjectLayoutContainer>;
};

export default ObjectLayout;
