import { ActionsTypes } from "./types";

export function addOxytocin(positions: any): any {
  return {
    type: ActionsTypes.ADD_OXYTOCIN,
    payload: positions,
  };
}

export function initOxytocin(params: {
  positionInit: number;
  init: boolean;
}): any {
  return {
    type: ActionsTypes.INIT_OXYTOCIN,
    payload: params,
  };
}

export function stopOxytocin(): any {
  return {
    type: ActionsTypes.STOP_OXYTOCIN,
  };
}
