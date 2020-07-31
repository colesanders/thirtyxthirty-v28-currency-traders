import { CurrencysEntity } from './currencys.models';
import { State, currencysAdapter, initialState } from './currencys.reducer';
import * as CurrencysSelectors from './currencys.selectors';

describe('Currencys Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCurrencysId = (it) => it['id'];
  const createCurrencysEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CurrencysEntity);

  let state;

  beforeEach(() => {
    state = {
      currencys: currencysAdapter.addAll(
        [
          createCurrencysEntity('PRODUCT-AAA'),
          createCurrencysEntity('PRODUCT-BBB'),
          createCurrencysEntity('PRODUCT-CCC'),
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

  describe('Currencys Selectors', () => {
    it('getAllCurrencys() should return the list of Currencys', () => {
      const results = CurrencysSelectors.getAllCurrencys(state);
      const selId = getCurrencysId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CurrencysSelectors.getSelected(state);
      const selId = getCurrencysId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCurrencysLoaded() should return the current 'loaded' status", () => {
      const result = CurrencysSelectors.getCurrencysLoaded(state);

      expect(result).toBe(true);
    });

    it("getCurrencysError() should return the current 'error' state", () => {
      const result = CurrencysSelectors.getCurrencysError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
