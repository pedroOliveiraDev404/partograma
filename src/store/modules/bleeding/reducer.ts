import { Reducer } from "redux";

import { produce } from "immer";

import { BleedingReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: BleedingReducer = {
  loading: false,
  signed: false,
  data: {
    bleedingData: data02 as any,
  },
};

type ReturnReducer = Reducer<BleedingReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_BLEEDING: {
        draft.loading = true;
        draft.data.bleedingData = action.payload;
        break;
      }

      default:
    }
  });
};

export default auth;
