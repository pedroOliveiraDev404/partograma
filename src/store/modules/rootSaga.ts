import { all } from 'redux-saga/effects';


import partogramachart from './partogramaChart/sagas';


export default function* rootSaga(): Generator {
  return yield all([partogramachart]);
}
