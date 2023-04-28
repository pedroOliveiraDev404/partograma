import { Reducer } from "redux";

import { produce } from "immer";

import { PartogramaChartReducer, ActionsTypes } from "./types";
import { data02 } from "../../../pages/Pacientes/mock";

export const INITIAL_STATE: PartogramaChartReducer = {
  loading: false,
  signed: false,
  data: {
    positionData: data02,
    tabIndex: 0,
    backgroundColorChart: "",
    birth: null,
    earlyDelivery: "",
    typePregnancy: "",
    placenta: "",
    firstBabyBirth: false,
    openLines: false,
    earlyPosition: "",
    numberOfDeliveries: null,
    openMenuHistoric: false,
    editDilatation: null,
    editPosition: null,
  },
};

type ReturnReducer = Reducer<PartogramaChartReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.ADD_POSITION: {
        draft.loading = true;
        draft.data.positionData = action.payload;
        break;
      }

      case ActionsTypes.SELECT_TAB: {
        draft.loading = false;
        draft.data.tabIndex = action.payload;
        break;
      }

      case ActionsTypes.ON_EDIT_DILATATION: {
        draft.loading = false;
        draft.data.editDilatation = action.payload;
        break;
      }

      case ActionsTypes.ON_EDIT_POSITION: {
        draft.loading = false;
        draft.data.editPosition = action.payload;
        break;
      }

      case ActionsTypes.SELECT_BACKGROUND_COLOR: {
        draft.loading = false;
        draft.data.backgroundColorChart = action.payload;
        break;
      }

      case ActionsTypes.SELECT_BIRTH: {
        draft.loading = false;
        draft.data.birth = action.payload;
        break;
      }

      case ActionsTypes.SELECT_EARLY_DELIVERY: {
        draft.loading = false;
        draft.data.earlyDelivery = action.payload;
        break;
      }

      case ActionsTypes.SELECT_TYPE_PREGNANCY: {
        draft.loading = false;
        draft.data.typePregnancy = action.payload;
        break;
      }

      case ActionsTypes.SELECT_PLACENTA: {
        draft.loading = false;
        draft.data.placenta = action.payload;
        break;
      }

      case ActionsTypes.SELECT_FIRST_BABY_BIRTH: {
        draft.loading = false;
        draft.data.firstBabyBirth = action.payload;
        break;
      }

      case ActionsTypes.TOGGLE_LINES: {
        draft.loading = false;
        draft.data.openLines = !state.data.openLines;
        break;
      }

      case ActionsTypes.SELECT_EARLY_POSITION: {
        draft.loading = false;
        draft.data.earlyPosition = action.payload;
        break;
      }

      case ActionsTypes.SELECT_NUMBER_OF_DELIVERIES: {
        draft.loading = false;
        draft.data.numberOfDeliveries = action.payload;
        break;
      }

      case ActionsTypes.TOGGLE_MENU_HISTORIC: {
        draft.loading = false;
        draft.data.openMenuHistoric = !state.data.openMenuHistoric;
        break;
      }

      default:
    }
  });
};

export default auth;
