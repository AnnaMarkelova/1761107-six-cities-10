import { HotelsData } from '../../../../types/state';
import { makeFakeHotel } from '../../../../utils/mock';
import { fetchHotelAction, fetchHotelsAction, fetchNearbyHotelsAction } from '../../api-actions';
import { hotelsData } from './hotels-data';

describe('Reducer: favoritesHotelsData', () => {

  let state: HotelsData;

  beforeEach(() => {
    state = {
      hotels: [],
      currentHotel: null,
      nearbyHotels: [],
    };
  });

  const loadedHotels = new Array(4).fill(null).map(() => makeFakeHotel());

  it('without additional parameters should return initial state', () => {
    expect(hotelsData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should update hotels by load hotels', () => {
    expect(hotelsData.reducer(state, { type: fetchHotelsAction.fulfilled.type, payload: loadedHotels }))
      .toEqual({
        hotels: loadedHotels,
        currentHotel: null,
        nearbyHotels: [],
      });
  });

  it('should update currentHotel by load hotel', () => {
    const loadedHotel = makeFakeHotel();
    expect(hotelsData.reducer(state, { type: fetchHotelAction.fulfilled.type, payload: loadedHotel }))
      .toEqual({
        hotels: [],
        currentHotel: loadedHotel,
        nearbyHotels: [],
      });
  });

  it('should update nearbyHotels by load nearbyHotels', () => {
    expect(hotelsData.reducer(state, { type: fetchNearbyHotelsAction.fulfilled.type, payload: loadedHotels }))
      .toEqual({
        hotels: [],
        currentHotel: null,
        nearbyHotels: loadedHotels,
      });
  });
});
