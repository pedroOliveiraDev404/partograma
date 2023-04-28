import { Reducer } from "redux";

import { produce } from "immer";

import { ContractionReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: ContractionReducer = {
  loading: false,
  signed: false,
  data: {
    contractionData: data02 as any,
  },
};

type ReturnReducer = Reducer<ContractionReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_CONTRACTION: {
        draft.loading = true;
        draft.data.contractionData = action.payload;
        break;
      }

      default:
    }
  });
};

export default auth;
