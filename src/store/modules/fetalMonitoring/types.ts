export interface DataReducer {
  fetalMonitoringData: (
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

export interface FetalMonitoringReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_FETAL_MONITORING: "@fetalmonitoring/ADD_FETAL_MONITORING",
};
