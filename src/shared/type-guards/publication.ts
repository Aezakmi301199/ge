interface Publication {
  status: string;
  target: string;
  createdAt: string;
  updatedAt: string;
  internalId: string | null;
  propertyId: string;
}

interface PublicationHistory {
  data: {
    key: string;
    newValue: Publication[];
    oldValue: Publication[];
  };
}

export function isPublicationHistory(history: unknown): history is PublicationHistory {
  if (typeof history !== 'object' || history === null) {
    return false;
  }

  if (!('data' in history)) {
    return false;
  }

  const data = (history as { data: unknown }).data;

  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const { key, newValue, oldValue } = data as { key: unknown; newValue: unknown; oldValue: unknown };

  if (key !== 'publications' || !Array.isArray(newValue) || !Array.isArray(oldValue)) {
    return false;
  }

  return newValue.every((item) => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'status' in item &&
      'target' in item &&
      'createdAt' in item &&
      'updatedAt' in item &&
      'internalId' in item &&
      'propertyId' in item
    );
  });
}
