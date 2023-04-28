import { ActionsTypes } from './types';

export function addNonPharmacological(positions: any): any {
  return {
    type: ActionsTypes.ADD_NON_PHARMACOLOGICAL,
    payload: positions,
  };
}
