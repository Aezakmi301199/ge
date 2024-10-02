export const targets = [
  {
    name: 'Etagi',
    target: 'ETAGI',
  },
  {
    name: 'Property Finder',
    target: 'PROPERTY_FINDER',
  },
];

export const targetKeys: Record<string, string> = {
  ETAGI: 'Etagi',
  PROPERTY_FINDER: 'Property Finder',
};

export const replaceTargetKey = (key: string) => {
  return targetKeys[key];
};
