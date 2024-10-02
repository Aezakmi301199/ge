import { useContext } from 'react';
import { RootStoreContext } from './store.provider';

export const useRootStore = () => useContext(RootStoreContext);
