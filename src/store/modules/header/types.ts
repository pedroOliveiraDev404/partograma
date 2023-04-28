export interface DataReducer {
  gestacionalAge: GestacionalAge | null;
  obstetricHistory: ObstetricHistory | null;
  carePlan: CarePlan | null;
  bloodType: BloodType | null;
  statusGbs: StatusGbs | null;
  pregnancyType: PregnancyType | null;
  ruptureOne: Rupture  | null;
  ruptureTwo?: Rupture  | null;
  deliveryTime: DeliveryTime | null;
  birthTimeOne: BirthTime  | null;
  birthTimeTwo?: BirthTime  | null;
}

export interface GestacionalAge {
  weeksDum: number;
  daysDum: number;
  weeksUltrasound: number;
  daysUltrasound: number;
  observation: string;
  responsible: string;
  dateOfRegistration: string;
  dateOfSystem: string;
}

export interface ObstetricHistory {
  numberOfBirths: number;
  numberOfGestations: number;
  numberOfAbortions: number;
  vaginalChildbirth: number;
  cesareanChildbirth: number;
  observation: string;
  responsible: string;
  dateOfSystem: string;
}

export interface CarePlan {
  carePlan: string;
  observation: string;
  responsible: string;
  dateOfSystem: string;
}

export interface PregnancyType {
  pregnancyType: string;
  observation: string;
  babyNumbers?: string;
}

export interface DeliveryTime {
  deliveryTime: string;
  observation: string;
}

export interface BirthTime {
  birthTime: string;
  birthType: string;
  observation: string;
}

export interface BirthTime {
  birthTime: string;
  birthType: string;
  observation: string;
  index: number;
}

export interface Rupture {
  dateTimeRupture: string;
  ruptureMode: string;
  ruptureIndication: string;
  liquidVolume: string;
  liquidAspect: string;
  observation: string;
  index: number;
}

export interface BloodType {
  bloodType: string;
  rhFactor: string;
  observation: string;
  responsible: string;
  dateOfSystem: string;
}

export interface StatusGbs {
  statusGbs: string;
  statusGbsDateTime: string;
  observation: string;
  responsible: string;
  dateOfSystem: string;
}

export interface HeaderReducer {
  data: DataReducer;
}

export const ActionsTypes = {
  ADD_GESTACIONAL_AGE: "@header/ADD_GESTACIONAL_AGE",
  ADD_OBSTETRIC_HISTORY: "@header/ADD_OBSTETRIC_HISTORY",
  ADD_CARE_PLAN: "@header/ADD_CARE_PLAN",
  ADD_BLOOD_TYPE: "@header/ADD_BLOOD_TYPE",
  ADD_STATUS_GBS: "@header/ADD_STATUS_GBS",
  ADD_PREGNANCY_TYPE: "@header/ADD_PREGNANCY_TYPE",
  ADD_RUPTURE: "@header/ADD_RUPTURE",
  ADD_DELIVERY_TIME: "@header/ADD_DELIVERY_TIME",
  ADD_BIRTH_TIME: "@header/ADD_BIRTH_TIME",
};
