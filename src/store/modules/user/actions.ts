import { Action } from 'redux';

import { UserInfo } from './types';

export const actions = {
  SAVE_USER_INFO: '@user/SAVE_USER_INFO',
};

export function saveUserInfo(infos: UserInfo): any {
  return {
    type: actions.SAVE_USER_INFO,
    payload: infos,
  };
}
