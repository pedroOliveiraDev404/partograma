import { Reducer } from "react";

import { AnyAction, CombinedState, combineReducers } from "redux";

import { connectRouter } from "connected-react-router";
import { History } from "history";

import partogramaChart from "./partogramaChart/reducer";
import nonPharmacological from "./nonPharmacological/reducer";
import clinicalNotes from "./clinicalNotes/reducer";
import posture from "./posture/reducer";
import fluidintake from "./fluidIntake/reducer";
import company from "./company/reducer";
import bleeding from "./bleeding/reducer";
import amnioticFluid from "./amnioticFluid/reducer";
import contraction from "./contraction/reducer";
import pharmacological from "./pharmacological/reducer";
import oxytocin from "./oxytocin/reducer";
import fetalMonitoring from "./fetalMonitoring/reducer";
import header from "./header/reducer";
import user from "./user/reducer";

export default (history: History): Reducer<CombinedState<any>, AnyAction> => {
  return combineReducers({
    router: connectRouter(history),
    partogramaChart,
    clinicalNotes,
    nonPharmacological,
    posture,
    fluidintake,
    bleeding,
    company,
    amnioticFluid,
    contraction,
    pharmacological,
    oxytocin,
    fetalMonitoring,
    header,
    user,
  });
};
