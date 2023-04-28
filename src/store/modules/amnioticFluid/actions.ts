import { ActionsTypes } from "./types";

export function addAmniotic(positions: any): any {
  return {
    type: ActionsTypes.ADD_AMNIOTIC,
    payload: positions,
  };
}

export function initAmniotic(params: {
  positionInit: number;
  init: boolean;
}): any {
  return {
    type: ActionsTypes.INIT_AMNIOTIC,
    payload: params,
  };
}

export function stopAmniotic(): any {
  return {
    type: ActionsTypes.STOP_AMNIOTIC,
  };
}

export function addAmnioticGemelar(positions: any): any {
  return {
    type: ActionsTypes.ADD_AMNIOTIC_GEMELAR,
    payload: positions,
  };
}

export function initAmnioticGemelar(params: {
  positionInit: number;
  init: boolean;
}): any {
  return {
    type: ActionsTypes.INIT_AMNIOTIC_GEMELAR,
    payload: params,
  };
}

export function stopAmnioticGemelar(): any {
  return {
    type: ActionsTypes.STOP_AMNIOTIC_GEMELAR,
  };
}

