import { Cities } from '../../../../consts/cities';
import { CityData } from '../../../../types/state';
import { cityData, setCity } from './city-data';

describe('Reducer: city-data', () => {

  let state: CityData;

  beforeEach(() => {
    state = { city: Cities[0] };
  });

  it('without additional parameters should return initial state', () => {
    expect(cityData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should set current City in setCity', () => {
    expect(cityData.reducer(state, { type: setCity.type, payload:Cities[1] }))
      .toEqual({ city: Cities[1] });
  });
});
