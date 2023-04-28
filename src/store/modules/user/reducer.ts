import { Reducer } from 'redux';

import { produce } from 'immer';

import { actions } from './actions';
import { UserReducer } from './types';

export const INITIAL_STATE: UserReducer = {
  hubInfo: {
    guid: '',
    roles: [],
    schoolId: '',
    schoolName: '',
    selectedRole: '',
    educationalLevel: '',
  },
};

type ReturnReducer = Reducer<UserReducer>;

const auth: ReturnReducer = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case actions.SAVE_USER_INFO: {
        draft.hubInfo = action.payload;
        break;
      }

      default:
    }
  });
};

export default auth;
