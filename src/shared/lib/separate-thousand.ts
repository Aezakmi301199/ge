import React from 'react';

export const separateThousand = (value: React.ReactNode): string => {
  if (!value) {
    return '';
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
