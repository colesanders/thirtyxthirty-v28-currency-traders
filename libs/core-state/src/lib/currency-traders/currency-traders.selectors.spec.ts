import { CurrencyTradersEntity } from './currency-traders.models';
import {
  State,
  currencyTradersAdapter,
  initialState,
} from './currency-traders.reducer';
import * as CurrencyTradersSelectors from './currency-traders.selectors';

describe('CurrencyTraders Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCurrencyTradersId = (it) => it['id'];
  const createCurrencyTradersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CurrencyTradersEntity);

  let state;

  beforeEach(() => {
    state = {
      currencyTraders: currencyTradersAdapter.addAll(
        [
          createCurrencyTradersEntity('PRODUCT-AAA'),
          createCurrencyTradersEntity('PRODUCT-BBB'),
          createCurrencyTradersEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('CurrencyTraders Selectors', () => {
    it('getAllCurrencyTraders() should return the list of CurrencyTraders', () => {
      const results = CurrencyTradersSelectors.getAllCurrencyTraders(state);
      const selId = getCurrencyTradersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CurrencyTradersSelectors.getSelected(state);
      const selId = getCurrencyTradersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCurrencyTradersLoaded() should return the current 'loaded' status", () => {
      const result = CurrencyTradersSelectors.getCurrencyTradersLoaded(state);

      expect(result).toBe(true);
    });

    it("getCurrencyTradersError() should return the current 'error' state", () => {
      const result = CurrencyTradersSelectors.getCurrencyTradersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
