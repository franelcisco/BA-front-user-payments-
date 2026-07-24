import { createStore } from 'zustand/vanilla';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { BCVTasaState, BCVTasaStoreType } from '@/types/bcv';
import { useStore } from 'zustand';
import { paymentsService } from '@/services/payments.service';

export const BCVTasaStore = createStore<BCVTasaStoreType>()(
    persist(
        (set) => ({
            tasa: {
                amount: 0,
                date: new Date(),
            },
            setBCVData: (data: BCVTasaState) => {
                set(data);
            },
            refetch: async (): Promise<boolean> => {
                const data = await paymentsService.getBCVTasa();
                if (data && data.rate) {
                    set({
                        tasa: {
                            amount: data.rate,
                            date: new Date(),
                        },
                    });
                    return true;
                }
                set({
                    tasa: {
                        amount: 0,
                        date: new Date(),
                    },
                });
                return false;
            },
            checkBCVData: () => {
                const tasa = BCVTasaStore.getState().tasa;
                const currentDate = new Date();
                const tasaDay = new Date(tasa.date);
                if (
                    !(tasa.amount > 0) ||
                    tasaDay.getDay() !== currentDate.getDay() ||
                    tasaDay.getMonth() !== currentDate.getMonth()
                ) {
                    return false;
                }
                return true;
            },
        }),
        {
            name: 'bcv-tasa-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useBCVTasaStore = () => useStore(BCVTasaStore);
