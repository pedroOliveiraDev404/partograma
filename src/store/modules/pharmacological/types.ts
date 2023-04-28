export interface DataReducer {
  pharmacologicalData: (
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
  init: boolean;
  positionInit: string;
}

export interface CompnanyReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_PHARMACOLOGICAL: "@pharmacological/ADD_PHARMACOLOGICAL",
  INIT_PHARMACOLOGICAL: "@pharmacological/INIT_PHARMACOLOGICAL",
  STOP_PHARMACOLOGICAL: "@pharmacological/STOP_PHARMACOLOGICAL",
};
