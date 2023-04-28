import { Reducer } from "redux";

import { produce } from "immer";

import { PostureReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: PostureReducer = {
  loading: false,
  signed: false,
  data: {
    postureData: data02 as any,
  },
};

type ReturnReducer = Reducer<PostureReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_POSTURE: {
        draft.loading = true;
        draft.data.postureData = action.payload;
        break;
      }

      default:
    }
  });
};

export default auth;
