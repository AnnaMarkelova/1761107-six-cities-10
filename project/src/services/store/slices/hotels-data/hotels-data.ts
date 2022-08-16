import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../../consts/api-route';
import { HotelsData } from '../../../../types/state';
import { fetchHotelAction, fetchHotelsAction, fetchNearbyHotelsAction } from '../../api-actions';

const initialState: HotelsData = {
  hotels: [],
  currentHotel: null,
  nearbyHotels: [],
};

export const hotelsData = createSlice({
  name: NameSpace.DataHotels,
  initialState,
  reducers: {
    setCurrentHotel: (state, action) => {
      state.currentHotel = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHotelsAction.fulfilled, (state, action) => {
        state.hotels = action.payload;
      })
      .addCase(fetchHotelAction.fulfilled, (state, action) => {
        state.currentHotel = action.payload;
      })
      .addCase(fetchNearbyHotelsAction.fulfilled, (state, action) => {
        state.nearbyHotels = action.payload;
      });
  }
});

export const { setCurrentHotel } = hotelsData.actions;
