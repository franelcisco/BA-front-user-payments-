export type BCVTasaState = {
    tasa: {
        amount: number;
        date: Date;
    };
};

type BCVTasaActions = {
    setBCVData: (data: BCVTasaState) => void;
    checkBCVData: () => boolean;
    refetch: () => Promise<boolean>;
};

export type BCVTasaStoreType = BCVTasaState & BCVTasaActions;