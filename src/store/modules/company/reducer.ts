import { Reducer } from "redux";

import { produce } from "immer";

import { CompnanyReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: CompnanyReducer = {
  loading: false,
  signed: false,
  data: {
    companyData: data02 as any,
    init: false,
    positionInit: "",
  },
};

type ReturnReducer = Reducer<CompnanyReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_COMPANY: {
        draft.loading = true;
        draft.data.companyData = action.payload;
        break;
      }

      case ActionsTypes.INIT_COMPANY: {
        draft.loading = true;
        draft.data.init = action.payload.init;
        draft.data.positionInit = action.payload.positionInit;
        break;
      }

      case ActionsTypes.STOP_COMPANY: {
        draft.loading = true;
        draft.data.init = false;
        break;
      }

      default:
    }
  });
};

export default auth;
