import Url from '../app/models/Url';
import { getStringAleatoria } from '../utils/utils';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `esperava ${received} no intervalo determinado!${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `esperava ${received} no intervalo determinado! ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

describe('Funcao getStringAleatoria()', () => {

  test('Retorna string/hash 5a10 caracteres', () => {

    //const Url = new Url();
    const s: string = getStringAleatoria();


    expect(s).not.toBeNull();
    expect(s).not.toBeNaN();
    expect(s.length).toBeWithinRange(5, 10);

  });
});
