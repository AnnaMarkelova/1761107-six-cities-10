import { FavoritesHotelsData } from '../../../../types/state';
import { makeFakeHotel } from '../../../../utils/mock';
import { fetchFavoritesHotelsAction } from '../../api-actions';
import { favoritesHotelsData } from './favorites-hotels-data';

describe('Reducer: favoritesHotelsData', () => {

  let state: FavoritesHotelsData;

  it('without additional parameters should return initial state', () => {
    expect(favoritesHotelsData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ favoritesHotels: [] });
  });

  it('should update favorites hotels by load favorite hotels', () => {
    const loadedHotels = new Array(4).fill(null).map(() => makeFakeHotel());
    expect(favoritesHotelsData.reducer(state, { type: fetchFavoritesHotelsAction.fulfilled.type, payload: loadedHotels }))
      .toEqual({ favoritesHotels: loadedHotels});
  });
});
