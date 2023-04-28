import {
  mockPayloadAuthRequest,
  mockPayloadAuthSuccess,
} from '~/utils/test-utils/__mocks__/mockPayloads';

import { authRequest, authSuccess } from '../actions';
import auth, { INITIAL_STATE } from '../reducer';

describe('Teste - Auth - Reducer', () => {
  it('Retorna o estado inicial quando o tipo da action não é passado', () => {
    const result = auth(undefined, { type: null });
    expect(result).toEqual(INITIAL_STATE);
  });

  it('Deve alterar o loading para true', () => {
    const result = auth(INITIAL_STATE, authRequest(mockPayloadAuthRequest));
    expect(result).toEqual({ ...INITIAL_STATE, loading: true });
  });

  it('Deve alterar loading para false, data para o payload da action e signed true', () => {
    const result = auth(INITIAL_STATE, authSuccess(mockPayloadAuthSuccess));
    expect(result).toEqual({
      loading: false,
      data: mockPayloadAuthSuccess,
      signed: true,
    });
  });
});
