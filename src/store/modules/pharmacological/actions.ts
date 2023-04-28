import { ActionsTypes } from "./types";

export function addPharmacological(positions: any): any {
  return {
    type: ActionsTypes.ADD_PHARMACOLOGICAL,
    payload: positions,
  };
}

export function initPharmacological(params: {
  positionInit: number;
  init: boolean;
}): any {
  return {
    type: ActionsTypes.INIT_PHARMACOLOGICAL,
    payload: params,
  };
}

export function stopPharmacological(): any {
  return {
    type: ActionsTypes.STOP_PHARMACOLOGICAL,
  };
}
