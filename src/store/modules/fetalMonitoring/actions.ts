import { ActionsTypes } from "./types";

export function addFetalMonitoring(positions: any): any {
  return {
    type: ActionsTypes.ADD_FETAL_MONITORING,
    payload: positions,
  };
}
