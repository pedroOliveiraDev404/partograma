import { Reducer } from "redux";

import { produce } from "immer";

import { FetalMonitoringReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: FetalMonitoringReducer = {
  loading: false,
  signed: false,
  data: {
    fetalMonitoringData: data02 as any,
  },
};

type ReturnReducer = Reducer<FetalMonitoringReducer>;

const fetalmonitoring: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_FETAL_MONITORING: {
        draft.loading = true;
        draft.data.fetalMonitoringData = action.payload;
        break;
      }

      default:
    }
  });
};

export default fetalmonitoring;
