import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { renderHook } from '@testing-library/react';
import { cities } from '../consts/cities';
import useMap from './useMap';
import { createAPI } from '../services/api';
import { makeFakeHotel } from '../utils/mock';
import { State } from '../types/state';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const store = mockStore({
  DATA_HOTELS: {
    currentHotel: makeFakeHotel()
  },
});

describe('Hook: useMap', () => {

  const mapRef = {
    current: null
  };

  const wrapper = () => (
    <Provider store={store}>
      <div ref={mapRef} >
      </div>
    </Provider>
  );

  let city = cities[0];

  it('should return array with 1 elements', () => {

    const { rerender, result } = renderHook(() => {
      useEffect(() => {
        useMap(mapRef, city);
        return () => {
          useMap(mapRef, city);
        };
      }, [mapRef]);
    }, { wrapper });

    city = cities[1];
    rerender(mapRef);

    // console.log(result):
  });

});