import { Reducer } from "redux";

import { produce } from "immer";

import { AmnioticReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: AmnioticReducer = {
  loading: false,
  signed: false,
  data: {
    amnioticData: data02 as any,
    amnioticGemelarData: data02 as any,
    init: false,
    positionInit: "",
    initGemelar: false,
    positionInitGemelar: "",
  },
};

type ReturnReducer = Reducer<AmnioticReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_AMNIOTIC: {
        draft.loading = true;
        draft.data.amnioticData = action.payload;
        break;
      }

      case ActionsTypes.INIT_AMNIOTIC: {
        draft.loading = true;
        draft.data.init = action.payload.init;
        draft.data.positionInit = action.payload.positionInit;
        break;
      }

      case ActionsTypes.STOP_AMNIOTIC: {
        draft.loading = true;
        draft.data.init = false;
        break;
      }

      case ActionsTypes.ADD_AMNIOTIC_GEMELAR: {
        draft.loading = true;
        draft.data.amnioticGemelarData = action.payload;
        break;
      }

      case ActionsTypes.INIT_AMNIOTIC_GEMELAR: {
        draft.loading = true;
        draft.data.initGemelar = true;
        draft.data.positionInitGemelar = action.payload.positionInit;
        break;
      }

      case ActionsTypes.STOP_AMNIOTIC_GEMELAR: {
        draft.loading = true;
        draft.data.initGemelar = false;
        break;
      }

      default:
    }
  });
};

export default auth;
