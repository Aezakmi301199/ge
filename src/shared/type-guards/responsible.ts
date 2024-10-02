import { ResponsibleChangedHistory } from '../interfaces/property-history';
import { PropertyActionHistoryResponse } from '../api/generated-api/api.schemas';
import { ActionTypes } from '../enums/action-types.enum';

export function isResponsibleChangedHistory(
  history: ResponsibleChangedHistory | PropertyActionHistoryResponse,
): history is ResponsibleChangedHistory {
  return history.actionType === ActionTypes.RESPONSIBLE_CHANGED;
}
