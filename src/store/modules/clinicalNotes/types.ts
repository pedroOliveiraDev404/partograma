export interface DataReducer {
  clinicalNotesData: (
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

export interface ClinicalNotesReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_CLINICAL_NOTES: "@clinicalnotes/ADD_CLINICAL_NOTES",
};
