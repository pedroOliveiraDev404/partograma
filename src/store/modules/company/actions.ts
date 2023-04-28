import { ActionsTypes } from "./types";

export function addCompany(positions: any): any {
  return {
    type: ActionsTypes.ADD_COMPANY,
    payload: positions,
  };
}

export function initCompany(params: {
  positionInit: number;
  init: boolean;
}): any {
  return {
    type: ActionsTypes.INIT_COMPANY,
    payload: params,
  };
}

export function stopCompany(): any {
  return {
    type: ActionsTypes.STOP_COMPANY,
  };
}
