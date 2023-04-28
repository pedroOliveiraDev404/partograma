export interface DataReducer {
  companyData: (
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
  init: boolean;
  positionInit: string;
}

export interface CompnanyReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_COMPANY: "@company/ADD_COMPANY",
  INIT_COMPANY: "@company/INIT_COMPANY",
  STOP_COMPANY: "@company/STOP_COMPANY",
};
