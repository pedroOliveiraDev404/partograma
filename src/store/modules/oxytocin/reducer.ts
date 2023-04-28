import { Reducer } from "redux";

import { produce } from "immer";

import { OxytocinReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: OxytocinReducer = {
  loading: false,
  signed: false,
  data: {
    oxytocinData: data02 as any,
    init: false,
    positionInit: "",
  },
};

type ReturnReducer = Reducer<OxytocinReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_OXYTOCIN: {
        draft.loading = true;
        draft.data.oxytocinData = action.payload;
        break;
      }

      case ActionsTypes.INIT_OXYTOCIN: {
        draft.loading = true;
        draft.data.init = action.payload.init;
        draft.data.positionInit = action.payload.positionInit;
        break;
      }

      case ActionsTypes.STOP_OXYTOCIN: {
        draft.loading = true;
        draft.data.init = false;
        break;
      }

      default:
    }
  });
};

export default auth;
