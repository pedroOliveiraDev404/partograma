import { Reducer } from "redux";

import { produce } from "immer";

import { ClinicalNotesReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: ClinicalNotesReducer = {
  loading: false,
  signed: false,
  data: {
    clinicalNotesData: data02 as any,
  },
};

type ReturnReducer = Reducer<ClinicalNotesReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_CLINICAL_NOTES: {
        draft.loading = true;
        draft.data.clinicalNotesData = action.payload;
        break;
      }

      default:
    }
  });
};

export default auth;
