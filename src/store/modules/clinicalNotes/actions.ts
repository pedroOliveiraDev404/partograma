import { ActionsTypes } from './types';

export function addClinicalNotes(positions: any): any {
  return {
    type: ActionsTypes.ADD_CLINICAL_NOTES,
    payload: positions,
  };
}
