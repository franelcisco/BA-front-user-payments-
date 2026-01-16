import { createStore } from 'zustand/vanilla';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { API_HOST } from '@/utils/constants';
import type { BCVResponse, BCVTasaState, BCVTasaStoreType } from '@/types/bcv';
import { useStore } from 'zustand';

export const handleGetBCVTasa = async (): Promise<BCVTasaState | undefined> => {
    try {
        const response = await axios.get<BCVResponse>(`${API_HOST}/bcv`);
        if (response.status === 200) {
            return {
                tasa: {
                    amount: Number(response.data.data.tasa),
                    date: new Date(),
                },
            };
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

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
            refetch: async () => {
                const data = await handleGetBCVTasa();
                if (data) {
                    set(data);
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
                    tasa.amount === 0 ||
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
