import { ActionsTypes } from './types';

export function addPosture(positions: any): any {
  return {
    type: ActionsTypes.ADD_POSTURE,
    payload: positions,
  };
}
