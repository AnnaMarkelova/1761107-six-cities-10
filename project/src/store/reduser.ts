import { createReducer } from '@reduxjs/toolkit';
import { cities } from '../consts/cities';
import { getHotelsByCity } from '../utils/hotel-utils';
import { setCity, setDefaultCity } from './action';

const hotels = getHotelsByCity(cities[0]);

const initialState = {
  city: cities[0],
  hotels: hotels,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
      const currentHotels = getHotelsByCity(action.payload);
      state.hotels = currentHotels;
    })
    .addCase(setDefaultCity, (state) => {
      state.city = initialState.city;
      state.hotels = initialState.hotels;
    });
});

