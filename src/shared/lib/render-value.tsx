import React from 'react';

export const renderValue = <T,>(value: T): React.ReactNode => {
  if (typeof value === 'boolean') {
    return value ? 'added' : 'removed';
  }

  if (!value && typeof value !== 'boolean') {
    return '0';
  }

  return value.toString();
};
