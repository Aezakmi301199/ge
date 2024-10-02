import React from 'react';
import { AutorenewRounded, DeleteOutlineRounded } from '@mui/icons-material';
import { calculateDaysLeft } from '../../shared/lib/calculate-days-left';
import { ActionButtonContainer } from './ui/ui';
import type { CollectionResponse } from '../../shared/api/generated-api/api.schemas';
import { AmountLimit } from '../../shared/enums/amount-limit.enum';

interface ActionButtonProps {
  data: Pick<CollectionResponse, 'id' | 'expiresAt'>;
  renewCollection: (id: string, event: React.MouseEvent) => void;
  expireCollection: (id: string, event: React.MouseEvent) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ data, expireCollection, renewCollection }) => {
  return (
    <>
      {calculateDaysLeft(data.expiresAt) > AmountLimit.FIRST ? (
        <ActionButtonContainer onClick={(event) => expireCollection(data.id, event)} size={'small'}>
          <DeleteOutlineRounded fontSize={'small'} />
        </ActionButtonContainer>
      ) : (
        <ActionButtonContainer onClick={(event) => renewCollection(data.id, event)} size={'small'}>
          <AutorenewRounded fontSize={'small'} />
        </ActionButtonContainer>
      )}
    </>
  );
};

export default ActionButton;
