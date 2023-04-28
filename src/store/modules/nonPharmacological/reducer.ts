import { Reducer } from "redux";

import { produce } from "immer";

import { NonPharmacologicalReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: NonPharmacologicalReducer = {
  loading: false,
  signed: false,
  data: {
    nonPharmacologicalData: data02 as any,
  },
};

type ReturnReducer = Reducer<NonPharmacologicalReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_NON_PHARMACOLOGICAL: {
        draft.loading = true;
        draft.data.nonPharmacologicalData = action.payload;
        break;
      }

      default:
    }
  });
};

export default auth;
