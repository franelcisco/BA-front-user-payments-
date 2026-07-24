import type { StoreStoreType } from "@/types/store";
import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { useStore } from "zustand";

export const StoreStore = createStore<StoreStoreType>()(
  persist(
    (set) => ({
      order: undefined,
      casheaId: undefined,
      setOrder: (order: string | undefined) => set({ order }),
      setCasheaId: (casheaId: string | undefined) => set({ casheaId }),
      reset: () => set({ order: undefined, casheaId: undefined }),
    }),
    {
      name: "store-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useStoreStore = () => useStore(StoreStore);
