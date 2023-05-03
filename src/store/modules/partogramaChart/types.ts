export interface DataReducer {
  positionData: ObjData[];
  tabIndex: number;
  backgroundColorChart: string;
  birth: ObjData | null;
  earlyPosition: string;
  earlyDelivery: string;
  typePregnancy: string;
  placenta: string;
  firstBabyBirth: boolean;
  openLines: boolean;
  numberOfDeliveries: number | null;
  openMenuHistoric: boolean;
  editDilatation: ObjData| null;
  editPosition: ObjData | null;
}

export interface ObjData {
  timeLegend: string;
  time: string | Date;
  position: number;
  dilatacao?: number;
  ruptureOne?: number;
  ruptureTwo?: number;
  referenceLine?: number;
  dischargeOne?: number;
  dischargeTwo?: number;
  bloodOne?: number;
  bloodOnePh?: number;
  bloodTwo?: number;
  bloodTwoPh?: number;
  posicao?: number;
  valuePosition?: number;
  valuePositionTwo?: number;
  variety?: string;
  apresentation?: string;
  icon?: React.ReactElement;
  birthIconOne?: number;
  birthIconTwo?: number;
  observation?: string;
  consistency?: string;
  fading?: string;
  positionDilatation?: string;
  bloodTwoObservation?: string;
  bloodOneObservation?: string;
}

export interface PartogramaChartReducer {
  loading: boolean;
  signed: boolean;
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_POSITION: "@partogramachart/ADD_POSITION",
  ON_EDIT_DILATATION: "@partogramachart/ON_EDIT_DILATATION",
  ON_EDIT_POSITION: "@partogramachart/ON_EDIT_POSITION",
  SELECT_TAB: "@partogramachart/SELECT_TAB",
  SELECT_BACKGROUND_COLOR: "@partogramachart/SELECT_BACKGROUND_COLOR",
  SELECT_BIRTH: "@partogramachart/SELECT_BIRTH",
  SELECT_EARLY_DELIVERY: "@partogramachart/SELECT_EARLY_DELIVERY",
  SELECT_TYPE_PREGNANCY: "@partogramachart/SELECT_TYPE_PREGNANCY",
  SELECT_PLACENTA: "@partogramachart/SELECT_PLACENTA",
  SELECT_FIRST_BABY_BIRTH: "@partogramachart/SELECT_FIRST_BABY_BIRTH",
  TOGGLE_LINES: "@partogramachart/TOGGLE_LINES",
  SELECT_EARLY_POSITION: "@partogramachart/SELECT_EARLY_POSITION",
  SELECT_NUMBER_OF_DELIVERIES: "@partogramachart/SELECT_NUMBER_OF_DELIVERIES",
  TOGGLE_MENU_HISTORIC: "@partogramachart/TOGGLE_MENU_HISTORIC",
};
