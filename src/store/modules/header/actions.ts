import {
  ActionsTypes,
  BirthTime,
  BloodType,
  CarePlan,
  CustomizableTitle,
  DeliveryTime,
  DischargeTime,
  GestacionalAge,
  ObstetricHistory,
  PregnancyType,
  Rupture,
  StatusGbs,
} from "./types";

export function addGestacionalAge(gestacionalAge: GestacionalAge): any {
  return {
    type: ActionsTypes.ADD_GESTACIONAL_AGE,
    payload: gestacionalAge,
  };
}

export function addObstetricHistory(obstetricHistory: ObstetricHistory): any {
  return {
    type: ActionsTypes.ADD_OBSTETRIC_HISTORY,
    payload: obstetricHistory,
  };
}

export function addCarePlan(carePlan: CarePlan): any {
  return {
    type: ActionsTypes.ADD_CARE_PLAN,
    payload: carePlan,
  };
}

export function addBloodType(bloodType: BloodType): any {
  return {
    type: ActionsTypes.ADD_BLOOD_TYPE,
    payload: bloodType,
  };
}

export function addPregnancyType(pregnancyType: PregnancyType): any {
  return {
    type: ActionsTypes.ADD_PREGNANCY_TYPE,
    payload: pregnancyType,
  };
}

export function addStatusGbs(statusGbs: StatusGbs): any {
  return {
    type: ActionsTypes.ADD_STATUS_GBS,
    payload: statusGbs,
  };
}

export function addRupture(rupture: Rupture): any {
  return {
    type: ActionsTypes.ADD_RUPTURE,
    payload: rupture,
  };
}

export function addDeliveryTime(deliveryTime: DeliveryTime): any {
  return {
    type: ActionsTypes.ADD_DELIVERY_TIME,
    payload: deliveryTime,
  };
}

export function addBirthTime(birthTime: BirthTime): any {
  return {
    type: ActionsTypes.ADD_BIRTH_TIME,
    payload: birthTime,
  };
}

export function addDischargeTime(dischargeTime: DischargeTime): any {
  return {
    type: ActionsTypes.ADD_DISCHARGE_TIME,
    payload: dischargeTime,
  };
}

export function addCustomizableTitle(
  customizableTitle: CustomizableTitle
): any {
  return {
    type: ActionsTypes.ADD_CUSTOMIZABLE_TITLE,
    payload: customizableTitle,
  };
}
