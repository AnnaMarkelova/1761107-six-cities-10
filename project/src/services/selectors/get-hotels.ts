import { createSelector } from 'reselect';
import { City } from '../../types/city';
import { Hotel } from '../../types/hotel';
import { State } from '../../types/state';
import { getHotelsByCity } from '../../utils/hotel-utils';

export const getCity = (state: State): City => state.DATA_CITY.city;
export const getHotels = (state: State): Hotel[] => state.DATA_HOTELS.hotels;

export const selectHotelsByCity = createSelector([getCity, getHotels], (city, hotels) => getHotelsByCity(hotels, city));


