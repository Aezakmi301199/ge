import React from 'react';

export const catchEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, func: () => void) => {
  if (event.key !== 'Enter') {
    return;
  }

  event.preventDefault();
  func();
};
