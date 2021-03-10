import Url from '../app/models/Url';
import { getStringHash } from '../utils/utils';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected  ${received} not to be within range!${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected  ${received}  to be within range! ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

describe('Function getStringHash()', () => {

  test('return string/hash within 5-10 range chars', () => {


    const s: string = getStringHash();


    expect(s).not.toBeNull();
    expect(s).not.toBeNaN();
    expect(s.length).toBeWithinRange(5, 10);

  });
});
