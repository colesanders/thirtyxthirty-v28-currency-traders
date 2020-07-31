import { CurrencysEntity } from './currencys.models';
import * as CurrencysActions from './currencys.actions';
import { State, initialState, reducer } from './currencys.reducer';

describe('Currencys Reducer', () => {
  const createCurrencysEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CurrencysEntity);

  beforeEach(() => {});

  describe('valid Currencys actions', () => {
    it('loadCurrencysSuccess should return set the list of known Currencys', () => {
      const currencys = [
        createCurrencysEntity('PRODUCT-AAA'),
        createCurrencysEntity('PRODUCT-zzz'),
      ];
      const action = CurrencysActions.loadCurrencysSuccess({ currencys });

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
