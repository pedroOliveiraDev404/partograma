import { ActionsTypes } from './types';

export function addContraction(positions: any): any {
  return {
    type: ActionsTypes.ADD_CONTRACTION,
    payload: positions,
  };
}
