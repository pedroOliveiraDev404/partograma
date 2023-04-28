export interface DataReducer {
  amnioticData: (
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
  amnioticGemelarData: (
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
  initGemelar: boolean;
  positionInitGemelar: string;
}

export interface AmnioticReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_AMNIOTIC: "@amnioticfluid/ADD_AMNIOTIC",
  INIT_AMNIOTIC: "@amnioticfluid/INIT_AMNIOTIC",
  STOP_AMNIOTIC: "@amnioticfluid/STOP_AMNIOTIC",
  ADD_AMNIOTIC_GEMELAR: "@amnioticfluid/ADD_AMNIOTIC_GEMELAR",
  INIT_AMNIOTIC_GEMELAR: "@amnioticfluid/INIT_AMNIOTIC_GEMELAR",
  STOP_AMNIOTIC_GEMELAR: "@amnioticfluid/STOP_AMNIOTIC_GEMELAR",
};
