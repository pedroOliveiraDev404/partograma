import {
  mockActionAuthRequest,
  mockActionAuthSuccess,
  mockPayloadAuthRequest,
  mockPayloadAuthSuccess,
} from '~/utils/test-utils/__mocks__/mockPayloads';

import { authRequest, authSuccess } from '../actions';

describe('Teste - Auth - Actions', () => {
  it('Deve criar uma action de requisição de autenticação com os dados corretos', () => {
    expect(authRequest(mockPayloadAuthRequest)).toEqual(mockActionAuthRequest);
  });

  it('Deve criar uma action de sucesso de autenticação com os dados corretos', () => {
    expect(authSuccess(mockPayloadAuthSuccess)).toEqual(mockActionAuthSuccess);
  });
});
