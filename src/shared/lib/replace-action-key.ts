import { actionKey } from '../../entities/action/action-key';
import { t } from 'i18next';

export const replaceActionKey = (key: string) => {
  if (!actionKey[key]) {
    return t('Show');
  }

  return actionKey[key];
};
