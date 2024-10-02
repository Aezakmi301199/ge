import React, { createContext, ReactElement } from 'react';
import { AuthStore } from '../entities/auth/auth.store';
import { ViewStore } from '../entities/view/view-store';
import { PropertyStore } from '../entities/property/property.store';
import { CollectionStore } from '../entities/collection/collection.store';
import { HistoryStore } from '../entities/history/history.store';

class RootStore {
  public readonly authStore: AuthStore;
  public readonly propertyStore: PropertyStore;
  public readonly collectionStore: CollectionStore;
  public readonly historyStore: HistoryStore;
  public readonly viewStore: ViewStore;

  constructor(
    authStore: AuthStore,
    apartmentStore: PropertyStore,
    collectionStore: CollectionStore,
    historyStore: HistoryStore,
    viewStore: ViewStore,
  ) {
    this.authStore = authStore;
    this.propertyStore = apartmentStore;
    this.collectionStore = collectionStore;
    this.historyStore = historyStore;
    this.viewStore = viewStore;
  }
}

const authStore = new AuthStore();
const propertyStore = new PropertyStore();
const collectionStore = new CollectionStore();
const historyStore = new HistoryStore();
const viewStore = new ViewStore();
const rootStore = new RootStore(authStore, propertyStore, collectionStore, historyStore, viewStore);

export const RootStoreContext = createContext<RootStore>({} as RootStore);

export const RootStoreProvider: React.FC<React.PropsWithChildren<Record<string, ReactElement>>> = ({ children }) => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};
