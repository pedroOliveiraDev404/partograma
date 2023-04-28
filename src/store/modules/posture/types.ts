export interface DataReducer {
  postureData: (
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

export interface PostureReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_POSTURE: "@posture/ADD_POSTURE",
};
