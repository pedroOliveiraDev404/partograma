import { ActionsTypes, ObjData } from "./types";

export function addPosition(positions: any): any {
  return {
    type: ActionsTypes.ADD_POSITION,
    payload: positions,
  };
}

export function selectTab(tab: number): any {
  return {
    type: ActionsTypes.SELECT_TAB,
    payload: tab,
  };
}

export function onEditDilatation(toggle: any): any {
  return {
    type: ActionsTypes.ON_EDIT_DILATATION,
    payload: toggle,
  };
}

export function onEditPosition(toggle: any): any {
  return {
    type: ActionsTypes.ON_EDIT_POSITION,
    payload: toggle,
  };
}

export function selectBackgroundColor(color: string): any {
  return {
    type: ActionsTypes.SELECT_BACKGROUND_COLOR,
    payload: color,
  };
}

export function selectBirth(obj: ObjData): any {
  return {
    type: ActionsTypes.SELECT_BIRTH,
    payload: obj,
  };
}

export function selectEarlyDelivery(time: string): any {
  return {
    type: ActionsTypes.SELECT_EARLY_DELIVERY,
    payload: time,
  };
}

export function selectTypePregnancy(type: string): any {
  return {
    type: ActionsTypes.SELECT_TYPE_PREGNANCY,
    payload: type,
  };
}

export function selectPlacenta(type: string): any {
  return {
    type: ActionsTypes.SELECT_PLACENTA,
    payload: type,
  };
}

export function selectFirstBabyBirth(type: boolean): any {
  return {
    type: ActionsTypes.SELECT_FIRST_BABY_BIRTH,
    payload: type,
  };
}

export function toggleLines(): any {
  return {
    type: ActionsTypes.TOGGLE_LINES,
  };
}

export function selectEarlyPosition(position: string): any {
  return {
    type: ActionsTypes.SELECT_EARLY_POSITION,
    payload: position,
  };
}


export function selectNumberOfDeliveries(deliveries: number): any {
  return {
    type: ActionsTypes.SELECT_NUMBER_OF_DELIVERIES,
    payload: deliveries,
  };
}

export function toggleMenuHistoric(): any {
  return {
    type: ActionsTypes.TOGGLE_MENU_HISTORIC,
  };
}
