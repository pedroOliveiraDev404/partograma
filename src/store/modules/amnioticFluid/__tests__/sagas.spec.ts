import { runSaga } from 'redux-saga';
import { Payload } from 'redux-saga/effects';

import { SendInfos } from '@psdhub/helpers';

import api from '~/services/api';
import {
  mockPayloadAuthRequest,
  mockPayloadAuthSuccess,
} from '~/utils/test-utils/__mocks__/mockPayloads';
import store from '~/utils/test-utils/__mocks__/mockStore';

import { authSuccess, authRequest } from '../actions';
import { auth } from '../sagas';
import { DataReducer } from '../types';

describe('Teste - Auth - Sagas', () => {
  let dispatchedActions = store.getActions();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    store.clearActions();

    dispatchedActions = store.getActions();
  });

  it('Deve disparar a ação de sucesso corretamente', async () => {
    const spySetHeaders = jest.spyOn(api, 'setHeaders');

    await runSaga(
      store,
      auth,
      authRequest(mockPayloadAuthRequest) as Payload<SendInfos>,
    ).toPromise();

    expect(spySetHeaders).toHaveBeenCalledWith({
      'Content-Type': 'application/json',
      Authorization: `bearer ${mockPayloadAuthRequest.reduced_token}`,
    });

    expect(dispatchedActions).toEqual([
      authSuccess(mockPayloadAuthSuccess as DataReducer),
    ]);
  });
});
