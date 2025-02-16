import { expect, it, describe } from '@jest/globals';

import { initialStateUser as initialState, userSlice } from '../slice';

describe('register reducer', () => {
  it('initializes correctly', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});
