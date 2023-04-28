export interface DataReducer {
  nonPharmacologicalData: (
    | {
        hour: string;
        index: number;
        value: number;
      }
    | {
        hour: string;
        index: number;
        value?: undefined;
      }
  )[];
}

export interface NonPharmacologicalReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_NON_PHARMACOLOGICAL: "@nonpharmacological/ADD_NON_PHARMACOLOGICAL",
};
