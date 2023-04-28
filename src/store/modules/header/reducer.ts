import { Reducer } from "redux";

import { produce } from "immer";

import { HeaderReducer, ActionsTypes } from "./types";

export const INITIAL_STATE: HeaderReducer = {
  data: {
    gestacionalAge: null,
    obstetricHistory: null,
    carePlan: null,
    bloodType: null,
    statusGbs: null,
    pregnancyType: null,
    ruptureOne: null,
    ruptureTwo: null,
    deliveryTime: null,
    birthTimeOne: null,
    birthTimeTwo: null,
  },
};

type ReturnReducer = Reducer<HeaderReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_GESTACIONAL_AGE: {
        draft.data.gestacionalAge = action.payload;
        break;
      }

      case ActionsTypes.ADD_OBSTETRIC_HISTORY: {
        draft.data.obstetricHistory = action.payload;
        break;
      }

      case ActionsTypes.ADD_CARE_PLAN: {
        draft.data.carePlan = action.payload;
        break;
      }

      case ActionsTypes.ADD_BLOOD_TYPE: {
        draft.data.bloodType = action.payload;
        break;
      }

      case ActionsTypes.ADD_PREGNANCY_TYPE: {
        draft.data.pregnancyType = action.payload;
        break;
      }

      case ActionsTypes.ADD_STATUS_GBS: {
        draft.data.statusGbs = action.payload;
        break;
      }

      case ActionsTypes.ADD_RUPTURE: {
        if (action.payload.index === 1) {
          draft.data.ruptureTwo = action.payload;
        } else {
          draft.data.ruptureOne = action.payload;
        }

        break;
      }

      case ActionsTypes.ADD_BIRTH_TIME: {
        console.log(action.payload)
        if (action.payload.index === 1) {
          draft.data.birthTimeTwo = action.payload;
        } else {
          
          draft.data.birthTimeOne = action.payload;
        }

        break;
      }

      case ActionsTypes.ADD_DELIVERY_TIME: {
        draft.data.deliveryTime = action.payload;
        break;
      }

      default:
    }
  });
};

export default auth;
