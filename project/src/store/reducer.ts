import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { cities } from '../consts/cities';
import { getHotels } from '../mock/hotels';
import { setCity, setDefaultCity } from './action';

const hotels = getHotels();

const initialStateCity = {
  city: cities[0],
  hotels: hotels,
};

const reducer = createReducer(initialStateCity, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setDefaultCity, (state) => {
      state.city = initialStateCity.city;
      state.hotels = initialStateCity.hotels;
    });
});

export const rootReducer = combineReducers({reducer});
