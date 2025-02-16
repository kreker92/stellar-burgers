import { expect, it, describe } from '@jest/globals';

import {
  initialStateRegister as initialState,
  registerSlice
} from '../register-slice';

describe('register reducer', () => {
  it('initializes correctly', () => {
    const state = registerSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});
