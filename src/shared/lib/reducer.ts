export type State = {
  typeOfTransaction: string | null;
  propertyType: string | null;
  buildingType: string | null;
  historyType: string | null;
};

export type Action =
  | { type: 'TOGGLE_TRANSACTION'; payload: string }
  | { type: 'TOGGLE_PROPERTY_TYPE'; payload: string }
  | { type: 'TOGGLE_BUILDING_TYPE'; payload: string }
  | { type: 'TOGGLE_HISTORY_TYPE'; payload: string };

export const initialState: State = {
  typeOfTransaction: 'SALE',
  propertyType: 'APARTMENT',
  buildingType: 'Ready',
  historyType: 'All',
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_TRANSACTION':
      return {
        ...state,
        typeOfTransaction: state.typeOfTransaction === action.payload ? null : action.payload,
      };
    case 'TOGGLE_PROPERTY_TYPE':
      return {
        ...state,
        propertyType: state.propertyType === action.payload ? null : action.payload,
      };
    case 'TOGGLE_BUILDING_TYPE':
      return {
        ...state,
        buildingType: state.buildingType === action.payload ? null : action.payload,
      };
    case 'TOGGLE_HISTORY_TYPE':
      return {
        ...state,
        historyType: state.historyType === action.payload ? null : action.payload,
      };
    default:
      return state;
  }
};
