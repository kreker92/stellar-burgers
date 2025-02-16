import { expect, it, describe } from '@jest/globals';

import {
  initialStateConstructor as initialState,
  constructorSlice
} from '../slice';

describe('register reducer', () => {
  it('initializes correctly', () => {
    const state = constructorSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});
