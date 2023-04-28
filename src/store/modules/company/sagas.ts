import { all, takeLatest, put } from 'redux-saga/effects';




import { ActionsTypes } from './types';



export function* auth({ payload }: any): Generator {
  const { reduced_token, logged_in, primary_color, user_info } = payload;


}

export default all([takeLatest(ActionsTypes.ADD_COMPANY, auth)]);
