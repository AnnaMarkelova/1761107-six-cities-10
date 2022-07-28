import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { cities } from '../consts/cities';
import { sortType } from '../consts/sort-type';
import { getHotelsByCity } from '../utils/hotel-utils';
import { setCity, setDefaultCity, setSort } from './action';

const hotels = getHotelsByCity(cities[0]);

const initialStateCity = {
  city: cities[0],
  hotels: hotels,
};

const initialStateSort = {
  sort: sortType.POPULAR
};

const reducerCity = createReducer(initialStateCity, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
      state.hotels = getHotelsByCity(action.payload);
    })
    .addCase(setDefaultCity, (state) => {
      state.city = initialStateCity.city;
      state.hotels = initialStateCity.hotels;
    });
});

const reducerSort = createReducer(initialStateSort, (builder) => {
  builder
    .addCase(setSort, (state, action) => {
      state.sort = action.payload;
    });
});

export const rootReducer = combineReducers({reducerCity, reducerSort});
