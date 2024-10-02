import React, { ReactElement, useReducer } from 'react';
import { Action } from '../../../shared/enums/action';
import { initialState, reducer, State } from '../../../shared/lib/reducer';
import { observer } from 'mobx-react-lite';

interface TransactionPropertySelectorProps {
  children: (props: {
    state: State;
    toggleTransaction: (transactionName: string) => void;
    togglePropertyType: (propertyTypeName: string) => void;
    toggleBuildingType: (buildingType: string) => void;
    toggleHistoryType: (historyType: string) => void;
  }) => ReactElement;
  defaultState?: State;
  applyUnSelect?: boolean;
}

const TransactionPropertySelector: React.FC<TransactionPropertySelectorProps> = ({
  children,
  defaultState = initialState,
  applyUnSelect = true,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const toggleTransaction = (transactionName: string) => {
    if (!applyUnSelect && state.typeOfTransaction === transactionName) {
      return;
    }

    dispatch({ type: Action.TOGGLE_TRANSACTION, payload: transactionName });
  };

  const togglePropertyType = (propertyTypeName: string) => {
    if (!applyUnSelect && state.propertyType === propertyTypeName) {
      return;
    }

    dispatch({ type: Action.TOGGLE_PROPERTY_TYPE, payload: propertyTypeName });
  };

  const toggleBuildingType = (buildingTypeName: string) => {
    if (!applyUnSelect && state.buildingType === buildingTypeName) {
      return;
    }

    dispatch({ type: Action.TOGGLE_BUILDING_TYPE, payload: buildingTypeName });
  };

  const toggleHistoryType = (historyTypeName: string) => {
    if (!applyUnSelect && state.historyType === historyTypeName) {
      return;
    }

    dispatch({ type: Action.TOGGLE_HISTORY_TYPE, payload: historyTypeName });
  };

  return children({ state, toggleTransaction, togglePropertyType, toggleBuildingType, toggleHistoryType });
};

export default observer(TransactionPropertySelector);
