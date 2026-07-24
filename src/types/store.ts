export type StoreState = {
  order: string | undefined;
  casheaId: string | undefined;
};

type StoreActions = {
  setOrder: (order: string | undefined) => void;
  setCasheaId: (casheaId: string | undefined) => void;
  reset: () => void;
};

export type StoreStoreType = StoreState & StoreActions;
