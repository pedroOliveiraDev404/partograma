export interface DataReducer {
  fluidIntakeData: (
    | {
        hour: string;
        index: number;
        value: number;
      }
    | {
        hour: string;
        index: number;
        value?: undefined;
      }
  )[];
}

export interface FluidIntakeReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_FLUID_INTAKE: "@fluidintake/ADD_FLUID_INTAKE",
};
