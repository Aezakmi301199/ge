import React from 'react';
import { BodyTypographyMedium_1 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { replaceActionKey } from '../../../shared/lib/replace-action-key';

interface ActionKeyProps {
  actionKey: string;
}

const ActionKey: React.FC<ActionKeyProps> = ({ actionKey }) => {
  return <BodyTypographyMedium_1>{t(replaceActionKey(actionKey))}</BodyTypographyMedium_1>;
};

export default ActionKey;
