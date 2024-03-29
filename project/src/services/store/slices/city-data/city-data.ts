import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../../consts/api-route';
import { CITIES } from '../../../../consts/cities';
import { CityData } from '../../../../types/state';

const initialState: CityData = {
  city: CITIES[0],
};

export const cityData = createSlice({
  name: NameSpace.DataCity,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    }
  },
});

export const { setCity } = cityData.actions;
