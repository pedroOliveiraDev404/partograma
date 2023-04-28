import { ActionsTypes } from './types';

export function addBleeding(positions: any): any {
  return {
    type: ActionsTypes.ADD_BLEEDING,
    payload: positions,
  };
}
