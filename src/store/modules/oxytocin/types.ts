export interface DataReducer {
  oxytocinData: (
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

export interface OxytocinReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_OXYTOCIN: "@oxytocin/ADD_OXYTOCIN",
  INIT_OXYTOCIN: "@oxytocin/INIT_OXYTOCIN",
  STOP_OXYTOCIN: "@oxytocin/STOP_OXYTOCIN",
};
