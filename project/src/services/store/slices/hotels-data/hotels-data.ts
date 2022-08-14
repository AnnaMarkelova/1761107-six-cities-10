import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../../consts/api-route';
import { HotelsData } from '../../../../types/state';
import { fetchHotelAction, fetchHotelsAction, fetchNearbyHotelsAction } from '../../api-actions';

const initialState: HotelsData = {
  hotels: [],
  currentHotel: null,
  nearbyHotels: [],
  isDataLoading: false,
};

export const hotelsData = createSlice({
  name: NameSpace.DataHotels,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHotelsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchHotelsAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.hotels = action.payload;
      })
      .addCase(fetchHotelsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchHotelAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchHotelAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.currentHotel = action.payload;
      })
      .addCase(fetchHotelAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchNearbyHotelsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchNearbyHotelsAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.nearbyHotels = action.payload;
      })
      .addCase(fetchNearbyHotelsAction.rejected, (state) => {
        state.isDataLoading = false;
      });
  }
});
