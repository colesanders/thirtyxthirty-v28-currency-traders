import { CurrencyTradersEntity } from './currency-traders.models';
import * as CurrencyTradersActions from './currency-traders.actions';
import { State, initialState, reducer } from './currency-traders.reducer';

describe('CurrencyTraders Reducer', () => {
  const createCurrencyTradersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CurrencyTradersEntity);

  beforeEach(() => {});

  describe('valid CurrencyTraders actions', () => {
    it('loadCurrencyTradersSuccess should return set the list of known CurrencyTraders', () => {
      const currencyTraders = [
        createCurrencyTradersEntity('PRODUCT-AAA'),
        createCurrencyTradersEntity('PRODUCT-zzz'),
      ];
      const action = CurrencyTradersActions.loadCurrencyTradersSuccess({
        currencyTraders,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
