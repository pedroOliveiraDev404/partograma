import { ActionsTypes } from './types';

export function addFluidIntake(positions: any): any {
  return {
    type: ActionsTypes.ADD_FLUID_INTAKE,
    payload: positions,
  };
}
