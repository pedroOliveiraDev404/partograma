export interface DataReducer {
  contractionData: (
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

export interface ContractionReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_CONTRACTION: "@contraction/ADD_CONTRACTION",
};
