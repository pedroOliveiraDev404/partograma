import { Reducer } from "redux";

import { produce } from "immer";

import { FluidIntakeReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: FluidIntakeReducer = {
  loading: false,
  signed: false,
  data: {
    fluidIntakeData: data02 as any,
  },
};

type ReturnReducer = Reducer<FluidIntakeReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_FLUID_INTAKE: {
        draft.loading = true;
        draft.data.fluidIntakeData = action.payload;
        break;
      }

      default:
    }
  });
};

export default auth;
